<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Public, read-only REST API under /wp-json/shabzadeh/v1/. Every response
 * is already shaped like the frontend's TypeScript types (src/lib/content/types.ts)
 * so the Next.js data layer only has to fetch and use it directly.
 */
class SH_Rest_Api {

	const NAMESPACE_ = 'shabzadeh/v1';

	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );
	}

	public static function register_routes() {
		register_rest_route(
			self::NAMESPACE_,
			'/stories',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'get_stories' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			self::NAMESPACE_,
			'/stories/(?P<slug>[a-zA-Z0-9\-_]+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'get_story' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			self::NAMESPACE_,
			'/trips',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'get_trips' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			self::NAMESPACE_,
			'/trips/(?P<slug>[a-zA-Z0-9\-_]+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'get_trip' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			self::NAMESPACE_,
			'/photos',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'get_photos' ),
				'permission_callback' => '__return_true',
			)
		);
		register_rest_route(
			self::NAMESPACE_,
			'/videos',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'get_videos' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/* ---------------------------------------------------------------- */
	/* Shared helpers                                                    */
	/* ---------------------------------------------------------------- */

	private static function meta( $post_id, $name ) {
		return get_post_meta( $post_id, '_sh_' . $name, true );
	}

	private static function bilingual( $post_id, $key ) {
		return array(
			'fa' => (string) self::meta( $post_id, $key . '_fa' ),
			'en' => (string) self::meta( $post_id, $key . '_en' ),
		);
	}

	private static function cover_image( $post_id ) {
		$url = get_the_post_thumbnail_url( $post_id, 'large' );
		return $url ? $url : null;
	}

	private static function published_posts( $post_type, $args = array() ) {
		return get_posts(
			array_merge(
				array(
					'post_type'      => $post_type,
					'post_status'    => 'publish',
					'posts_per_page' => -1,
				),
				$args
			)
		);
	}

	private static function find_by_slug( $post_type, $slug ) {
		$posts = get_posts(
			array(
				'post_type'      => $post_type,
				'post_status'    => 'publish',
				'name'           => $slug,
				'posts_per_page' => 1,
			)
		);
		return $posts ? $posts[0] : null;
	}

	/* ---------------------------------------------------------------- */
	/* Stories                                                           */
	/* ---------------------------------------------------------------- */

	public static function get_stories( $request ) {
		$posts = self::published_posts( 'sh_story', array( 'orderby' => 'date', 'order' => 'DESC' ) );
		return array_map( array( __CLASS__, 'build_story' ), $posts );
	}

	public static function get_story( $request ) {
		$post = self::find_by_slug( 'sh_story', $request['slug'] );
		if ( ! $post ) {
			return new WP_Error( 'sh_not_found', 'داستان پیدا نشد.', array( 'status' => 404 ) );
		}
		return self::build_story( $post );
	}

	private static function build_story( $post ) {
		$id   = $post->ID;
		$type = self::meta( $id, 'story_type' ) ?: 'short';

		$story = array(
			'slug'        => $post->post_name,
			'type'        => $type,
			'title'       => self::bilingual( $id, 'title' ),
			'excerpt'     => self::bilingual( $id, 'excerpt' ),
			'coverImage'  => self::cover_image( $id ),
			'publishedAt' => get_the_date( 'c', $id ),
			'content'     => null,
			'chapters'    => null,
		);

		if ( 'long' === $type ) {
			$chapters       = self::published_posts(
				'sh_story_chapter',
				array(
					'meta_key'   => '_sh_parent_story',
					'meta_value' => $id,
					'orderby'    => 'menu_order',
					'order'      => 'ASC',
				)
			);
			$story['chapters'] = array_values(
				array_map(
					function ( $chapter ) {
						return array(
							'slug'    => $chapter->post_name,
							'order'   => (int) $chapter->menu_order,
							'title'   => self::bilingual( $chapter->ID, 'title' ),
							'content' => self::bilingual( $chapter->ID, 'content' ),
						);
					},
					$chapters
				)
			);
		} else {
			$story['content'] = self::bilingual( $id, 'content' );
		}

		return $story;
	}

	/* ---------------------------------------------------------------- */
	/* Trips                                                             */
	/* ---------------------------------------------------------------- */

	public static function get_trips( $request ) {
		$posts = self::published_posts( 'sh_trip', array( 'orderby' => 'meta_value', 'meta_key' => '_sh_start_date', 'order' => 'DESC' ) );
		return array_map( array( __CLASS__, 'build_trip' ), $posts );
	}

	public static function get_trip( $request ) {
		$post = self::find_by_slug( 'sh_trip', $request['slug'] );
		if ( ! $post ) {
			return new WP_Error( 'sh_not_found', 'سفرنامه پیدا نشد.', array( 'status' => 404 ) );
		}
		return self::build_trip( $post );
	}

	private static function build_trip( $post ) {
		$id = $post->ID;

		$parts = self::published_posts(
			'sh_trip_part',
			array(
				'meta_key'   => '_sh_parent_trip',
				'meta_value' => $id,
				'orderby'    => 'menu_order',
				'order'      => 'ASC',
			)
		);

		return array(
			'slug'        => $post->post_name,
			'title'       => self::bilingual( $id, 'title' ),
			'location'    => self::bilingual( $id, 'location' ),
			'excerpt'     => self::bilingual( $id, 'excerpt' ),
			'coverImage'  => self::cover_image( $id ),
			'startDate'   => self::meta( $id, 'start_date' ),
			'endDate'     => self::meta( $id, 'end_date' ),
			'parts'       => array_values(
				array_map(
					function ( $part ) {
						return array(
							'slug'        => $part->post_name,
							'order'       => (int) $part->menu_order,
							'title'       => self::bilingual( $part->ID, 'title' ),
							'excerpt'     => self::bilingual( $part->ID, 'excerpt' ),
							'content'     => self::bilingual( $part->ID, 'content' ),
							'coverImage'  => self::cover_image( $part->ID ),
							'publishedAt' => get_the_date( 'c', $part->ID ),
						);
					},
					$parts
				)
			),
		);
	}

	/* ---------------------------------------------------------------- */
	/* Photos                                                            */
	/* ---------------------------------------------------------------- */

	public static function get_photos( $request ) {
		$posts = self::published_posts( 'sh_photo', array( 'orderby' => 'date', 'order' => 'DESC' ) );
		return array_values( array_map( array( __CLASS__, 'build_photo' ), $posts ) );
	}

	private static function build_photo( $post ) {
		$id             = $post->ID;
		$related_trip   = self::meta( $id, 'related_trip' );
		$trip_slug      = $related_trip ? get_post_field( 'post_name', $related_trip ) : null;
		$attachment_id  = get_post_thumbnail_id( $id );
		$image          = $attachment_id ? wp_get_attachment_image_src( $attachment_id, 'large' ) : false;

		return array(
			'id'       => (string) $id,
			'src'      => $image ? $image[0] : null,
			'width'    => $image ? (int) $image[1] : null,
			'height'   => $image ? (int) $image[2] : null,
			'caption'  => self::bilingual( $id, 'caption' ),
			'tripSlug' => $trip_slug ?: null,
		);
	}

	/* ---------------------------------------------------------------- */
	/* Videos                                                            */
	/* ---------------------------------------------------------------- */

	public static function get_videos( $request ) {
		$posts = self::published_posts( 'sh_video', array( 'orderby' => 'date', 'order' => 'DESC' ) );
		return array_map( array( __CLASS__, 'build_video' ), $posts );
	}

	private static function build_video( $post ) {
		$id           = $post->ID;
		$provider     = self::meta( $id, 'provider' ) ?: 'youtube';
		$related_trip = self::meta( $id, 'related_trip' );
		$trip_slug    = $related_trip ? get_post_field( 'post_name', $related_trip ) : null;

		$video = array(
			'id'          => (string) $id,
			'provider'    => $provider,
			'title'       => self::bilingual( $id, 'title' ),
			'description' => self::bilingual( $id, 'description' ),
			'tripSlug'    => $trip_slug ?: null,
			'videoId'     => null,
			'embedUrl'    => null,
		);

		if ( 'youtube' === $provider ) {
			$video['videoId'] = self::extract_youtube_id( self::meta( $id, 'youtube_url_or_id' ) );
		} else {
			$video['embedUrl'] = self::meta( $id, 'linkedin_embed_url' ) ?: null;
		}

		return $video;
	}

	/**
	 * Accepts a bare 11-char YouTube ID or a full watch/share/embed URL
	 * and normalises it down to the ID.
	 */
	private static function extract_youtube_id( $value ) {
		if ( ! $value ) {
			return null;
		}
		if ( preg_match( '/^[a-zA-Z0-9_-]{11}$/', $value ) ) {
			return $value;
		}
		if ( preg_match( '/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/', $value, $matches ) ) {
			return $matches[1];
		}
		return null;
	}
}
