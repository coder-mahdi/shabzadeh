<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the bilingual "content" meta box for every Shabzadeh CPT
 * (driven by SH_Post_Types::fields_config()) and saves it back.
 */
class SH_Meta_Boxes {

	const NONCE_ACTION = 'sh_save_meta';
	const NONCE_NAME   = 'sh_meta_nonce';

	public static function init() {
		add_action( 'add_meta_boxes', array( __CLASS__, 'register' ) );
		add_action( 'save_post', array( __CLASS__, 'save' ) );
	}

	public static function register() {
		foreach ( array_keys( SH_Post_Types::fields_config() ) as $post_type ) {
			add_meta_box(
				'sh_fields_' . $post_type,
				'محتوای دوزبانه و جزئیات',
				array( __CLASS__, 'render' ),
				$post_type,
				'normal',
				'high'
			);
		}
	}

	public static function render( $post ) {
		$post_type = $post->post_type;
		$fields    = SH_Post_Types::fields_config()[ $post_type ] ?? array();

		wp_nonce_field( self::NONCE_ACTION, self::NONCE_NAME );

		echo '<div class="sh-meta-box">';
		foreach ( $fields as $key => $field ) {
			self::render_field( $post, $key, $field );
		}
		echo '</div>';
	}

	private static function render_field( $post, $key, $field ) {
		$type  = $field['type'];
		$label = $field['label'];

		echo '<div class="sh-field sh-field-' . esc_attr( $type ) . '">';
		echo '<h4 class="sh-field-label">' . esc_html( $label ) . '</h4>';

		if ( ! empty( $field['help'] ) ) {
			echo '<p class="sh-field-help">' . esc_html( $field['help'] ) . '</p>';
		}

		switch ( $type ) {
			case 'text_bilingual':
				self::render_bilingual_row( $post, $key, 'text' );
				break;

			case 'textarea_bilingual':
				self::render_bilingual_row( $post, $key, 'textarea' );
				break;

			case 'editor_bilingual':
				self::render_bilingual_editor( $post, $key );
				break;

			case 'select_static':
				self::render_select_static( $post, $key, $field['choices'] );
				break;

			case 'select_relation':
				self::render_select_relation( $post, $key, $field['post_type'], ! empty( $field['optional'] ) );
				break;

			case 'date':
				self::render_date( $post, $key );
				break;

			case 'text':
				self::render_text( $post, $key );
				break;
		}

		echo '</div>';
	}

	private static function meta( $post_id, $name ) {
		return get_post_meta( $post_id, '_sh_' . $name, true );
	}

	private static function render_bilingual_row( $post, $key, $input_type ) {
		$fa = self::meta( $post->ID, $key . '_fa' );
		$en = self::meta( $post->ID, $key . '_en' );

		echo '<div class="sh-bilingual-row">';

		echo '<div class="sh-lang-block sh-lang-fa" dir="rtl">';
		echo '<span class="sh-lang-tag">فارسی</span>';
		if ( 'textarea' === $input_type ) {
			echo '<textarea class="widefat" rows="3" name="sh_' . esc_attr( $key ) . '_fa" dir="rtl">' . esc_textarea( $fa ) . '</textarea>';
		} else {
			echo '<input type="text" class="widefat" dir="rtl" name="sh_' . esc_attr( $key ) . '_fa" value="' . esc_attr( $fa ) . '" />';
		}
		echo '</div>';

		echo '<div class="sh-lang-block sh-lang-en" dir="ltr">';
		echo '<span class="sh-lang-tag">English</span>';
		if ( 'textarea' === $input_type ) {
			echo '<textarea class="widefat" rows="3" name="sh_' . esc_attr( $key ) . '_en" dir="ltr">' . esc_textarea( $en ) . '</textarea>';
		} else {
			echo '<input type="text" class="widefat" dir="ltr" name="sh_' . esc_attr( $key ) . '_en" value="' . esc_attr( $en ) . '" />';
		}
		echo '</div>';

		echo '</div>';
	}

	private static function render_bilingual_editor( $post, $key ) {
		$fa = self::meta( $post->ID, $key . '_fa' );
		$en = self::meta( $post->ID, $key . '_en' );

		echo '<div class="sh-lang-block sh-lang-fa" dir="rtl">';
		echo '<span class="sh-lang-tag">فارسی</span>';
		wp_editor(
			$fa,
			'sh_' . $key . '_fa_editor',
			array(
				'textarea_name' => 'sh_' . $key . '_fa',
				'textarea_rows' => 10,
				'media_buttons' => false,
				'teeny'         => true,
			)
		);
		echo '</div>';

		echo '<div class="sh-lang-block sh-lang-en" dir="ltr">';
		echo '<span class="sh-lang-tag">English</span>';
		wp_editor(
			$en,
			'sh_' . $key . '_en_editor',
			array(
				'textarea_name' => 'sh_' . $key . '_en',
				'textarea_rows' => 10,
				'media_buttons' => false,
				'teeny'         => true,
			)
		);
		echo '</div>';
	}

	private static function render_select_static( $post, $key, $choices ) {
		$value = self::meta( $post->ID, $key );
		echo '<select name="sh_' . esc_attr( $key ) . '">';
		foreach ( $choices as $choice_value => $choice_label ) {
			echo '<option value="' . esc_attr( $choice_value ) . '" ' . selected( $value, $choice_value, false ) . '>' . esc_html( $choice_label ) . '</option>';
		}
		echo '</select>';
	}

	private static function render_select_relation( $post, $key, $related_post_type, $optional ) {
		$value   = self::meta( $post->ID, $key );
		$options = SH_Relation_Fields::options( $related_post_type );

		echo '<select name="sh_' . esc_attr( $key ) . '">';
		if ( $optional ) {
			echo '<option value="">— هیچ‌کدام —</option>';
		}
		foreach ( $options as $option_id => $option_label ) {
			echo '<option value="' . esc_attr( $option_id ) . '" ' . selected( $value, $option_id, false ) . '>' . esc_html( $option_label ) . '</option>';
		}
		echo '</select>';
	}

	private static function render_date( $post, $key ) {
		$value = self::meta( $post->ID, $key );
		echo '<input type="date" name="sh_' . esc_attr( $key ) . '" value="' . esc_attr( $value ) . '" />';
	}

	private static function render_text( $post, $key ) {
		$value = self::meta( $post->ID, $key );
		echo '<input type="text" class="widefat" dir="ltr" name="sh_' . esc_attr( $key ) . '" value="' . esc_attr( $value ) . '" />';
	}

	public static function save( $post_id ) {
		if ( ! isset( $_POST[ self::NONCE_NAME ] ) || ! wp_verify_nonce( $_POST[ self::NONCE_NAME ], self::NONCE_ACTION ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		$post_type = get_post_type( $post_id );
		$fields    = SH_Post_Types::fields_config()[ $post_type ] ?? null;
		if ( ! $fields || ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		foreach ( $fields as $key => $field ) {
			self::save_field( $post_id, $key, $field );
		}

		self::sync_display_title( $post_id, $post_type, $fields );
	}

	private static function save_field( $post_id, $key, $field ) {
		switch ( $field['type'] ) {
			case 'text_bilingual':
				self::save_meta( $post_id, $key . '_fa', 'text' );
				self::save_meta( $post_id, $key . '_en', 'text' );
				break;

			case 'textarea_bilingual':
				self::save_meta( $post_id, $key . '_fa', 'textarea' );
				self::save_meta( $post_id, $key . '_en', 'textarea' );
				break;

			case 'editor_bilingual':
				self::save_meta( $post_id, $key . '_fa', 'html' );
				self::save_meta( $post_id, $key . '_en', 'html' );
				break;

			case 'select_static':
			case 'select_relation':
			case 'date':
			case 'text':
				self::save_meta( $post_id, $key, 'text' );
				break;
		}
	}

	private static function save_meta( $post_id, $name, $sanitize_as ) {
		$field_name = 'sh_' . $name;
		if ( ! isset( $_POST[ $field_name ] ) ) {
			return;
		}

		$raw = wp_unslash( $_POST[ $field_name ] );

		switch ( $sanitize_as ) {
			case 'textarea':
				$value = sanitize_textarea_field( $raw );
				break;
			case 'html':
				$value = wp_kses_post( $raw );
				break;
			default:
				$value = sanitize_text_field( $raw );
				break;
		}

		update_post_meta( $post_id, '_sh_' . $name, $value );
	}

	/**
	 * Keeps the native WP post title (used internally for admin lists,
	 * relation dropdowns and the REST slug) in sync with the fa title so
	 * editors never have to fill in the same title twice.
	 */
	private static function sync_display_title( $post_id, $post_type, $fields ) {
		$display_name = null;
		if ( isset( $fields['title'] ) ) {
			$display_name = self::meta( $post_id, 'title_fa' );
		} elseif ( isset( $fields['caption'] ) ) {
			$display_name = self::meta( $post_id, 'caption_fa' );
		}

		if ( empty( $display_name ) ) {
			return;
		}

		$current = get_post( $post_id );
		if ( $current->post_title === $display_name ) {
			return;
		}

		remove_action( 'save_post', array( __CLASS__, 'save' ) );
		wp_update_post(
			array(
				'ID'         => $post_id,
				'post_title' => $display_name,
				'post_name'  => $current->post_name ? $current->post_name : sanitize_title( $display_name ),
			)
		);
		add_action( 'save_post', array( __CLASS__, 'save' ) );
	}
}
