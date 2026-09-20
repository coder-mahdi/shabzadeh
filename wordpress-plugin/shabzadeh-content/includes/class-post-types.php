<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers all custom post types and the shared admin menu they live under,
 * plus the field configuration every other class (meta boxes, REST API,
 * admin columns) reads from.
 */
class SH_Post_Types {

	const MENU_SLUG = 'shabzadeh-content';

	public static function init() {
		add_action( 'init', array( __CLASS__, 'register_post_types' ) );
		add_action( 'admin_menu', array( __CLASS__, 'register_admin_menu' ), 9 );
	}

	/**
	 * One top-level admin menu ("شب‌زده") that every CPT nests under via
	 * show_in_menu => self::MENU_SLUG, so the WP sidebar stays organized
	 * instead of listing six separate top-level menus.
	 */
	public static function register_admin_menu() {
		add_menu_page(
			'شب‌زده',
			'شب‌زده',
			'edit_posts',
			self::MENU_SLUG,
			array( 'SH_Settings', 'render_page' ),
			'dashicons-book-alt',
			25
		);
	}

	/**
	 * Field configuration shared by the meta boxes UI and the REST API
	 * response builders. Keeping this in one place means adding a field
	 * only ever requires one edit.
	 *
	 * Field types: text, text_bilingual, textarea_bilingual, editor_bilingual,
	 * select_static (choices => [value => label]), select_relation (post_type => slug),
	 * date.
	 */
	public static function fields_config() {
		return array(
			'sh_story'         => array(
				'story_type' => array(
					'label'   => 'نوع داستان',
					'type'    => 'select_static',
					'choices' => array(
						'short' => 'داستان کوتاه',
						'long'  => 'داستان بلند (با فصل)',
					),
				),
				'title'      => array( 'label' => 'عنوان داستان', 'type' => 'text_bilingual' ),
				'excerpt'    => array( 'label' => 'خلاصه', 'type' => 'textarea_bilingual' ),
				'content'    => array(
					'label' => 'متن داستان (فقط برای «داستان کوتاه» — داستان بلند از فصل‌ها ساخته می‌شود)',
					'type'  => 'editor_bilingual',
				),
			),
			'sh_story_chapter' => array(
				'parent_story' => array( 'label' => 'داستان مادر', 'type' => 'select_relation', 'post_type' => 'sh_story' ),
				'title'        => array( 'label' => 'عنوان فصل', 'type' => 'text_bilingual' ),
				'content'      => array( 'label' => 'متن فصل', 'type' => 'editor_bilingual' ),
			),
			'sh_trip'          => array(
				'title'      => array( 'label' => 'عنوان سفرنامه', 'type' => 'text_bilingual' ),
				'location'   => array( 'label' => 'مکان', 'type' => 'text_bilingual' ),
				'excerpt'    => array( 'label' => 'خلاصه', 'type' => 'textarea_bilingual' ),
				'start_date' => array( 'label' => 'تاریخ شروع سفر', 'type' => 'date' ),
				'end_date'   => array( 'label' => 'تاریخ پایان سفر', 'type' => 'date' ),
			),
			'sh_trip_part'     => array(
				'parent_trip' => array( 'label' => 'سفر مادر', 'type' => 'select_relation', 'post_type' => 'sh_trip' ),
				'title'       => array( 'label' => 'عنوان قسمت', 'type' => 'text_bilingual' ),
				'excerpt'     => array( 'label' => 'خلاصه قسمت', 'type' => 'textarea_bilingual' ),
				'content'     => array( 'label' => 'متن قسمت', 'type' => 'editor_bilingual' ),
			),
			'sh_photo'         => array(
				'related_trip' => array( 'label' => 'مربوط به کدام سفر (اختیاری)', 'type' => 'select_relation', 'post_type' => 'sh_trip', 'optional' => true ),
				'caption'      => array( 'label' => 'زیرنویس عکس', 'type' => 'text_bilingual' ),
			),
			'sh_video'         => array(
				'related_trip'        => array( 'label' => 'مربوط به کدام سفر (اختیاری)', 'type' => 'select_relation', 'post_type' => 'sh_trip', 'optional' => true ),
				'title'               => array( 'label' => 'عنوان ویدیو', 'type' => 'text_bilingual' ),
				'description'         => array( 'label' => 'توضیح ویدیو', 'type' => 'textarea_bilingual' ),
				'provider'            => array(
					'label'   => 'منبع ویدیو',
					'type'    => 'select_static',
					'choices' => array(
						'youtube'  => 'یوتیوب',
						'linkedin' => 'لینکدین',
					),
				),
				'youtube_url_or_id'   => array(
					'label' => 'لینک یا شناسه یوتیوب',
					'type'  => 'text',
					'help'  => 'وقتی منبع «یوتیوب» است: کل لینک ویدیو یا فقط شناسه ۱۱ کاراکتری آن را اینجا بگذارید.',
				),
				'linkedin_embed_url' => array(
					'label' => 'لینک امبد لینکدین',
					'type'  => 'text',
					'help'  => 'وقتی منبع «لینکدین» است: روی پست لینکدین گزینه‌ی ⋯ سپس «Embed this post» را بزنید و آدرس داخل src="" را همان‌جا کپی و اینجا پیست کنید.',
				),
			),
		);
	}

	public static function labels() {
		return array(
			'sh_story'         => array( 'name' => 'داستان‌ها', 'singular' => 'داستان' ),
			'sh_story_chapter' => array( 'name' => 'فصل‌های داستان', 'singular' => 'فصل داستان' ),
			'sh_trip'          => array( 'name' => 'سفرنامه‌ها', 'singular' => 'سفرنامه' ),
			'sh_trip_part'     => array( 'name' => 'قسمت‌های سفرنامه', 'singular' => 'قسمت سفرنامه' ),
			'sh_photo'         => array( 'name' => 'عکس‌ها', 'singular' => 'عکس' ),
			'sh_video'         => array( 'name' => 'ویدیوها', 'singular' => 'ویدیو' ),
		);
	}

	public static function register_post_types() {
		$labels_map = self::labels();

		self::register_cpt( 'sh_story', $labels_map['sh_story'], array( 'title', 'thumbnail' ), 'dashicons-edit-large' );
		self::register_cpt( 'sh_story_chapter', $labels_map['sh_story_chapter'], array( 'title', 'page-attributes' ), 'dashicons-media-text' );
		self::register_cpt( 'sh_trip', $labels_map['sh_trip'], array( 'title', 'thumbnail' ), 'dashicons-location-alt' );
		self::register_cpt( 'sh_trip_part', $labels_map['sh_trip_part'], array( 'title', 'thumbnail', 'page-attributes' ), 'dashicons-media-document' );
		self::register_cpt( 'sh_photo', $labels_map['sh_photo'], array( 'title', 'thumbnail' ), 'dashicons-format-image' );
		self::register_cpt( 'sh_video', $labels_map['sh_video'], array( 'title' ), 'dashicons-video-alt3' );
	}

	private static function register_cpt( $slug, $labels, $supports, $icon ) {
		register_post_type(
			$slug,
			array(
				'labels'             => array(
					'name'          => $labels['name'],
					'singular_name' => $labels['singular'],
					'add_new_item'  => 'افزودن ' . $labels['singular'],
					'edit_item'     => 'ویرایش ' . $labels['singular'],
					'all_items'     => $labels['name'],
					'search_items'  => 'جست‌وجوی ' . $labels['name'],
					'not_found'     => 'چیزی پیدا نشد',
				),
				'public'             => true,
				'show_ui'            => true,
				'show_in_menu'       => self::MENU_SLUG,
				'menu_icon'          => $icon,
				'supports'           => $supports,
				'has_archive'        => false,
				'show_in_rest'       => false, // We expose our own shabzadeh/v1 REST routes instead.
				'rewrite'            => array( 'slug' => $slug ),
				'capability_type'    => 'post',
				'hierarchical'       => false,
			)
		);
	}
}
