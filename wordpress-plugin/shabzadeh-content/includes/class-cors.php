<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Allows the configured frontend origin to read the shabzadeh/v1 REST
 * routes cross-origin. Only applies to our own namespace — it never
 * touches WordPress's default REST behaviour for anything else.
 */
class SH_Cors {

	public static function init() {
		add_filter( 'rest_pre_serve_request', array( __CLASS__, 'add_headers' ), 10, 4 );
	}

	public static function add_headers( $served, $result, $request, $server ) {
		$route = $request->get_route();
		if ( strpos( $route, '/shabzadeh/v1' ) === 0 ) {
			$origin = SH_Settings::get_allowed_origin();
			header( 'Access-Control-Allow-Origin: ' . $origin );
			header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
			header( 'Access-Control-Allow-Headers: Content-Type' );
		}
		return $served;
	}
}
