<?php
/**
 * Plugin Name: Shabzadeh Content
 * Description: Headless CMS for the Shabzadeh site — bilingual (Persian/English) stories, travelogues, photos and videos, exposed over a read-only REST API for the Next.js frontend.
 * Version: 1.0.0
 * Author: Shabzadeh
 * Text Domain: shabzadeh-content
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

define( 'SH_VERSION', '1.0.0' );
define( 'SH_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'SH_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once SH_PLUGIN_DIR . 'includes/class-post-types.php';
require_once SH_PLUGIN_DIR . 'includes/class-relation-fields.php';
require_once SH_PLUGIN_DIR . 'includes/class-meta-boxes.php';
require_once SH_PLUGIN_DIR . 'includes/class-admin-columns.php';
require_once SH_PLUGIN_DIR . 'includes/class-settings.php';
require_once SH_PLUGIN_DIR . 'includes/class-cors.php';
require_once SH_PLUGIN_DIR . 'includes/class-rest-api.php';

SH_Post_Types::init();
SH_Meta_Boxes::init();
SH_Admin_Columns::init();
SH_Settings::init();
SH_Cors::init();
SH_Rest_Api::init();

/**
 * CPTs change the permalink structure, so rewrite rules must be flushed
 * once on activation/deactivation (not on every request).
 */
function sh_activate_plugin() {
	SH_Post_Types::register_post_types();
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'sh_activate_plugin' );

function sh_deactivate_plugin() {
	flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'sh_deactivate_plugin' );

function sh_enqueue_admin_assets( $hook ) {
	global $post_type;
	$sh_post_types = array( 'sh_story', 'sh_story_chapter', 'sh_trip', 'sh_trip_part', 'sh_photo', 'sh_video' );
	if ( in_array( $post_type, $sh_post_types, true ) ) {
		wp_enqueue_style( 'shabzadeh-admin', SH_PLUGIN_URL . 'assets/admin.css', array(), SH_VERSION );
	}
}
add_action( 'admin_enqueue_scripts', 'sh_enqueue_admin_assets' );
