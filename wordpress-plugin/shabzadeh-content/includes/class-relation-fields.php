<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Helper for "select another post of this CPT" relation fields
 * (parent_story, parent_trip, related_trip).
 */
class SH_Relation_Fields {

	/**
	 * Returns [post_id => post_title] for every published/draft post of
	 * the given post type, ordered by title.
	 */
	public static function options( $post_type ) {
		$posts = get_posts(
			array(
				'post_type'      => $post_type,
				'post_status'    => array( 'publish', 'draft', 'pending', 'future' ),
				'posts_per_page' => -1,
				'orderby'        => 'title',
				'order'          => 'ASC',
			)
		);

		$options = array();
		foreach ( $posts as $post ) {
			$title             = $post->post_title !== '' ? $post->post_title : '(بدون عنوان #' . $post->ID . ')';
			$options[ $post->ID ] = $title;
		}
		return $options;
	}
}
