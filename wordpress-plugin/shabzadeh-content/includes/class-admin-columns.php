<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Adds helpful columns to each CPT's admin list table: a cover thumbnail,
 * the parent relation (chapter → story, part → trip), and a fa/en
 * completeness indicator so missing translations are easy to spot.
 */
class SH_Admin_Columns {

	public static function init() {
		foreach ( array_keys( SH_Post_Types::fields_config() ) as $post_type ) {
			add_filter( "manage_{$post_type}_posts_columns", array( __CLASS__, 'columns' ) );
			add_action( "manage_{$post_type}_posts_custom_column", array( __CLASS__, 'render_column' ), 10, 2 );
		}
	}

	public static function columns( $columns ) {
		$new = array();
		foreach ( $columns as $key => $label ) {
			$new[ $key ] = $label;
			if ( 'title' === $key ) {
				$new['sh_cover']      = 'کاور';
				$new['sh_parent']     = 'مرتبط با';
				$new['sh_languages']  = 'زبان‌ها';
			}
		}
		return $new;
	}

	public static function render_column( $column, $post_id ) {
		$post_type = get_post_type( $post_id );
		$fields    = SH_Post_Types::fields_config()[ $post_type ] ?? array();

		if ( 'sh_cover' === $column ) {
			if ( has_post_thumbnail( $post_id ) ) {
				echo get_the_post_thumbnail( $post_id, array( 48, 48 ), array( 'style' => 'object-fit:cover;border-radius:4px;' ) );
			} else {
				echo '—';
			}
			return;
		}

		if ( 'sh_parent' === $column ) {
			$relation_key = null;
			foreach ( $fields as $key => $field ) {
				if ( 'select_relation' === $field['type'] ) {
					$relation_key = $key;
					break;
				}
			}
			if ( ! $relation_key ) {
				echo '—';
				return;
			}
			$related_id = get_post_meta( $post_id, '_sh_' . $relation_key, true );
			echo $related_id ? esc_html( get_the_title( $related_id ) ) : '—';
			return;
		}

		if ( 'sh_languages' === $column ) {
			$text_key = isset( $fields['title'] ) ? 'title' : ( isset( $fields['caption'] ) ? 'caption' : null );
			if ( ! $text_key ) {
				echo '—';
				return;
			}
			$fa = get_post_meta( $post_id, '_sh_' . $text_key . '_fa', true );
			$en = get_post_meta( $post_id, '_sh_' . $text_key . '_en', true );
			echo $fa ? '✅ FA' : '⬜ FA';
			echo ' &nbsp; ';
			echo $en ? '✅ EN' : '⬜ EN';
			return;
		}
	}
}
