<?php
/**
 * Plugin Name: MSSF Content Types & Backend
 * Description: Custom post types, REST endpoints, webhook, and security for the MSSF headless WordPress CMS.
 * Version:     1.0.0
 * Author:      Akinola Olujobi
 *
 * This must-use plugin powers the entire headless CMS backend for mssf.com.ng.
 * It is loaded automatically by WordPress from wp-content/mu-plugins/.
 *
 * Sections:
 *  1. Custom Post Types (6)
 *  2. Contact Form REST Endpoint
 *  3. CORS Headers
 *  4. GitHub Actions Webhook (save_post)
 *  5. REST API Lockdown
 *  6. Frontend Redirect
 *  7. Webhook Log Admin Page
 *
 * @package MSSF
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
|--------------------------------------------------------------------------
| 1. Custom Post Types & Post Meta
|--------------------------------------------------------------------------
|
| Six post types that model every content entity the MSSF frontend needs.
| All public types expose data via the WP REST API (show_in_rest = true)
| so the Next.js frontend can fetch them at build time.
|
*/

/**
 * Register all MSSF custom post types and their meta fields.
 *
 * Hooked to `init` so WordPress core is fully loaded.
 *
 * @return void
 */
function mssf_register_post_types() {

	/* ---- Timeline Entry ------------------------------------------------
	 * Tracks dated events: renovations, furniture purchases, health
	 * outreach, water projects, admin milestones, and material sourcing.
	 * ------------------------------------------------------------------ */
	register_post_type( 'timeline_entry', array(
		'label'        => 'Timeline Entries',
		'public'       => true,
		'show_in_rest' => true,
		'supports'     => array( 'title', 'editor', 'thumbnail' ),
		'menu_icon'    => 'dashicons-calendar-alt',
		'has_archive'  => true,
		'rewrite'      => array( 'slug' => 'timeline' ),
	) );

	register_post_meta( 'timeline_entry', 'entry_date', array(
		'type'              => 'string',
		'single'            => true,
		'show_in_rest'      => true,
		'sanitize_callback' => 'sanitize_text_field',
		'description'       => 'ISO-format date for this timeline event.',
	) );

	register_post_meta( 'timeline_entry', 'category', array(
		'type'              => 'string',
		'single'            => true,
		'show_in_rest'      => true,
		'sanitize_callback' => 'sanitize_text_field',
		'description'       => 'One of: renovation, furniture, materials, health, water, admin.',
	) );

	register_post_meta( 'timeline_entry', 'quantity', array(
		'type'              => 'string',
		'single'            => true,
		'show_in_rest'      => true,
		'sanitize_callback' => 'sanitize_text_field',
		'description'       => 'Free-text quantity or count for the entry.',
	) );

	register_post_meta( 'timeline_entry', 'remark', array(
		'type'              => 'string',
		'single'            => true,
		'show_in_rest'      => true,
		'sanitize_callback' => 'sanitize_text_field',
		'description'       => 'Additional notes or remarks.',
	) );

	/* ---- Team Member ---------------------------------------------------
	 * Staff profiles shown on the "Our Team" page.
	 * ------------------------------------------------------------------ */
	register_post_type( 'team_member', array(
		'label'        => 'Team Members',
		'public'       => true,
		'show_in_rest' => true,
		'supports'     => array( 'title', 'editor', 'thumbnail' ),
		'menu_icon'    => 'dashicons-groups',
		'has_archive'  => true,
		'rewrite'      => array( 'slug' => 'team' ),
	) );

	register_post_meta( 'team_member', 'role', array(
		'type'              => 'string',
		'single'            => true,
		'show_in_rest'      => true,
		'sanitize_callback' => 'sanitize_text_field',
		'description'       => 'Job title / role within the organisation.',
	) );

	register_post_meta( 'team_member', 'is_founder', array(
		'type'         => 'boolean',
		'single'       => true,
		'show_in_rest' => true,
		'description'  => 'Whether this person is a founder.',
	) );

	/* ---- Partner Organisation ------------------------------------------
	 * External organisations that collaborate with MSSF.
	 * ------------------------------------------------------------------ */
	register_post_type( 'partner_org', array(
		'label'        => 'Our Partners',
		'public'       => true,
		'show_in_rest' => true,
		'supports'     => array( 'title', 'editor', 'thumbnail' ),
		'menu_icon'    => 'dashicons-building',
		'has_archive'  => true,
		'rewrite'      => array( 'slug' => 'partners' ),
	) );

	/* ---- Gallery Item --------------------------------------------------
	 * Photo items displayed in the site gallery, categorised by context.
	 * Only needs title + thumbnail; no editor block.
	 * ------------------------------------------------------------------ */
	register_post_type( 'gallery_item', array(
		'label'        => 'Gallery',
		'public'       => true,
		'show_in_rest' => true,
		'supports'     => array( 'title', 'thumbnail' ),
		'menu_icon'    => 'dashicons-format-gallery',
		'has_archive'  => true,
		'rewrite'      => array( 'slug' => 'gallery' ),
	) );

	register_post_meta( 'gallery_item', 'category', array(
		'type'              => 'string',
		'single'            => true,
		'show_in_rest'      => true,
		'sanitize_callback' => 'sanitize_text_field',
		'description'       => 'One of: renovation, classroom, outreach, donations_events.',
	) );

	/* ---- Site Content --------------------------------------------------
	 * One-off editable content blocks (e.g. "About intro paragraph",
	 * "Mission statement") that the frontend fetches by slug.
	 * No featured image needed — purely textual.
	 * ------------------------------------------------------------------ */
	register_post_type( 'site_content', array(
		'label'        => 'Site Content',
		'public'       => true,
		'show_in_rest' => true,
		'supports'     => array( 'title', 'editor' ),
		'menu_icon'    => 'dashicons-admin-page',
		'has_archive'  => false,
		'rewrite'      => array( 'slug' => 'site-content' ),
	) );

	/* ---- Contact Submission (private) ----------------------------------
	 * Backup copies of contact form entries, stored as private posts.
	 * Hidden from the REST API and the public site. Staff can review
	 * them in wp-admin but cannot manually create new ones.
	 * ------------------------------------------------------------------ */
	register_post_type( 'contact_submission', array(
		'label'        => 'Contact Submissions',
		'public'       => false,
		'show_ui'      => true,
		'show_in_rest' => false,
		'supports'     => array( 'title', 'editor' ),
		'menu_icon'    => 'dashicons-email',
		'capabilities' => array(
			'create_posts' => 'do_not_allow',
		),
		'map_meta_cap' => true,
	) );
}
add_action( 'init', 'mssf_register_post_types' );


/*
|--------------------------------------------------------------------------
| 2. Contact Form REST Endpoint
|--------------------------------------------------------------------------
|
| POST /wp-json/mssf/v1/contact
|
| Accepts name, email, phone, subject, message.  A hidden "website" field
| acts as a honeypot — bots that fill it are silently ignored.
|
| On success the handler:
|   a) Sends an email to info@mssf.com.ng
|   b) Stores a private `contact_submission` post as a backup record
|
*/

/**
 * Register the MSSF contact form REST route.
 *
 * @return void
 */
function mssf_register_contact_route() {
	register_rest_route( 'mssf/v1', '/contact', array(
		'methods'             => 'POST',
		'permission_callback' => '__return_true', // Public endpoint.
		'callback'            => 'mssf_handle_contact_submission',
	) );
}
add_action( 'rest_api_init', 'mssf_register_contact_route' );

/**
 * Handle an incoming contact form submission.
 *
 * @param WP_REST_Request $request The incoming REST request.
 * @return WP_REST_Response|WP_Error
 */
function mssf_handle_contact_submission( WP_REST_Request $request ) {

	// Sanitise every field on arrival.
	$name     = sanitize_text_field( $request->get_param( 'name' ) );
	$email    = sanitize_email( $request->get_param( 'email' ) );
	$phone    = sanitize_text_field( $request->get_param( 'phone' ) );
	$subject  = sanitize_text_field( $request->get_param( 'subject' ) );
	$message  = sanitize_textarea_field( $request->get_param( 'message' ) );
	$honeypot = $request->get_param( 'website' ); // Hidden field — bots fill this.

	// Honeypot check: if the hidden field has a value, silently discard.
	if ( ! empty( $honeypot ) ) {
		return new WP_REST_Response( array( 'status' => 'ignored' ), 200 );
	}

	// Validate required fields.
	if ( empty( $name ) || ! is_email( $email ) || empty( $message ) ) {
		return new WP_Error(
			'invalid_input',
			'Missing required fields (name, valid email, and message are required).',
			array( 'status' => 400 )
		);
	}

	// Build the email body.
	$body = sprintf(
		"Name: %s\nEmail: %s\nPhone: %s\n\n%s",
		$name,
		$email,
		$phone,
		$message
	);

	// Send the notification email.
	wp_mail(
		'info@mssf.com.ng',
		sprintf( 'New Contact: %s', $subject ),
		$body,
		array( 'Reply-To: ' . $email )
	);

	// Store a backup copy in wp-admin as a private post.
	wp_insert_post( array(
		'post_type'    => 'contact_submission',
		'post_title'   => sprintf( '%s - %s', $name, $subject ),
		'post_content' => $message,
		'post_status'  => 'private',
		'meta_input'   => array(
			'email' => $email,
			'phone' => $phone,
		),
	) );

	return new WP_REST_Response( array( 'status' => 'sent' ), 200 );
}


/*
|--------------------------------------------------------------------------
| 3. CORS Headers
|--------------------------------------------------------------------------
|
| Because the CMS lives on cms.mssf.com.ng while the frontend is served
| from mssf.com.ng, the browser enforces the Same-Origin Policy.  These
| headers whitelist the frontend origin for GET/POST/OPTIONS requests.
|
| The OPTIONS pre-flight is handled early and exits before WordPress
| does any heavy lifting.
|
*/

/**
 * Send CORS headers on every response so the Next.js frontend can
 * communicate with the REST API cross-origin.
 *
 * @return void
 */
function mssf_send_cors_headers() {
	$allowed_origin = 'https://mssf.com.ng';

	header( 'Access-Control-Allow-Origin: ' . $allowed_origin );
	header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
	header( 'Access-Control-Allow-Headers: Content-Type' );

	// Handle OPTIONS pre-flight requests immediately.
	if ( isset( $_SERVER['REQUEST_METHOD'] ) && 'OPTIONS' === $_SERVER['REQUEST_METHOD'] ) {
		status_header( 204 );
		exit;
	}
}
add_action( 'init', 'mssf_send_cors_headers' );


/*
|--------------------------------------------------------------------------
| 4. GitHub Actions Webhook (save_post)
|--------------------------------------------------------------------------
|
| Every time a post is created / updated (excluding revisions and
| autosaves) we fire a repository_dispatch event to trigger a
| Next.js rebuild via GitHub Actions.
|
| The deploy token is read from the MSSF_GH_DEPLOY_TOKEN constant
| which must be defined in wp-config.php — never hard-coded here.
|
| The last 20 webhook attempts are logged to `mssf_webhook_log` so
| administrators can debug delivery issues from the admin page.
|
*/

/**
 * Dispatch a GitHub Actions event when any post is saved.
 *
 * @param int $post_id The ID of the post being saved.
 * @return void
 */
function mssf_trigger_github_deploy( $post_id ) {

	// Ignore revisions and autosaves — they aren't real content changes.
	if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
		return;
	}

	// Bail if no deploy token is configured.
	if ( ! defined( 'MSSF_GH_DEPLOY_TOKEN' ) || empty( MSSF_GH_DEPLOY_TOKEN ) ) {
		return;
	}

	$response = wp_remote_post(
		'https://api.github.com/repos/iamGoldenOla/mssf/dispatches',
		array(
			'headers' => array(
				'Authorization' => 'token ' . MSSF_GH_DEPLOY_TOKEN,
				'Accept'        => 'application/vnd.github+json',
				'User-Agent'    => 'MSSF-WordPress-Webhook',
			),
			'body'    => wp_json_encode( array( 'event_type' => 'wp-content-updated' ) ),
			'timeout' => 15,
		)
	);

	// Append to the rolling log (keep last 20 entries).
	$log   = get_option( 'mssf_webhook_log', array() );
	$log[] = array(
		'time'    => current_time( 'mysql' ),
		'post_id' => $post_id,
		'status'  => is_wp_error( $response )
			? $response->get_error_message()
			: wp_remote_retrieve_response_code( $response ),
	);
	$log = array_slice( $log, -20 );
	update_option( 'mssf_webhook_log', $log );
}
add_action( 'save_post', 'mssf_trigger_github_deploy' );


/*
|--------------------------------------------------------------------------
| 5. REST API Lockdown
|--------------------------------------------------------------------------
|
| Security hardening for the headless setup:
|
|   a) The /wp/v2/users endpoint is completely removed. There is no
|      legitimate reason for the public to enumerate user accounts.
|
|   b) All other core REST endpoints (comments, settings, etc.) require
|      authentication.  Only our custom post type endpoints and native
|      posts/pages remain publicly readable.
|
*/

/**
 * Remove the Users endpoint from the REST API to prevent user enumeration.
 *
 * @param array $endpoints Registered REST API endpoints.
 * @return array Filtered endpoints.
 */
function mssf_remove_users_endpoint( $endpoints ) {
	// Remove both /wp/v2/users and /wp/v2/users/<id>.
	if ( isset( $endpoints['/wp/v2/users'] ) ) {
		unset( $endpoints['/wp/v2/users'] );
	}
	if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
		unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
	}

	return $endpoints;
}
add_filter( 'rest_endpoints', 'mssf_remove_users_endpoint' );

/**
 * Restrict non-public REST endpoints to authenticated users only.
 *
 * Public (unauthenticated) access is allowed for:
 *   - Custom MSSF endpoints  (mssf/v1/*)
 *   - Posts                  (wp/v2/posts)
 *   - Pages                  (wp/v2/pages)
 *   - Custom post types      (wp/v2/timeline_entry, etc.)
 *   - Media                  (wp/v2/media)  — needed for images
 *   - Taxonomies & categories (wp/v2/categories, wp/v2/tags)
 *
 * Everything else (settings, comments, plugins, themes, etc.) requires
 * the user to be logged in.
 *
 * @param WP_REST_Response|WP_Error $result  Result to send to client.
 * @param WP_REST_Server            $server  Server instance.
 * @param WP_REST_Request           $request Current request.
 * @return WP_REST_Response|WP_Error
 */
function mssf_restrict_rest_api( $result, $server, $request ) {

	// Already errored — don't interfere.
	if ( is_wp_error( $result ) ) {
		return $result;
	}

	// Authenticated users can access everything.
	if ( is_user_logged_in() ) {
		return $result;
	}

	$route = $request->get_route();

	// Whitelist: custom MSSF routes.
	if ( strpos( $route, '/mssf/v1/' ) === 0 ) {
		return $result;
	}

	// Whitelist: public core + CPT routes.
	$public_patterns = array(
		'/wp/v2/posts',
		'/wp/v2/pages',
		'/wp/v2/media',
		'/wp/v2/categories',
		'/wp/v2/tags',
		'/wp/v2/timeline_entry',
		'/wp/v2/team_member',
		'/wp/v2/partner_org',
		'/wp/v2/gallery_item',
		'/wp/v2/site_content',
	);

	foreach ( $public_patterns as $pattern ) {
		if ( strpos( $route, $pattern ) === 0 ) {
			return $result;
		}
	}

	// Block everything else for unauthenticated requests.
	return new WP_Error(
		'rest_forbidden',
		'Authentication required.',
		array( 'status' => 401 )
	);
}
add_filter( 'rest_pre_dispatch', 'mssf_restrict_rest_api', 10, 3 );


/*
|--------------------------------------------------------------------------
| 6. Frontend Redirect
|--------------------------------------------------------------------------
|
| In a headless setup no one should see the raw WordPress theme output.
| Any request that reaches the theme layer (i.e. not wp-admin and not
| the REST API) is 301-redirected to the Next.js frontend.
|
*/

/**
 * Redirect all front-end theme requests to the Next.js site.
 *
 * @return void
 */
function mssf_redirect_frontend() {
	// Allow wp-admin and REST API requests to proceed normally.
	if ( is_admin() || defined( 'REST_REQUEST' ) ) {
		return;
	}

	wp_redirect( 'https://mssf.com.ng', 301 );
	exit;
}
add_action( 'template_redirect', 'mssf_redirect_frontend' );


/*
|--------------------------------------------------------------------------
| 7. Webhook Log Admin Page
|--------------------------------------------------------------------------
|
| Adds a "Webhook Log" page under Tools so administrators can see the
| last 20 webhook fire attempts at a glance — helpful for debugging
| failed deploys without needing SSH access.
|
*/

/**
 * Register the Webhook Log admin page under Tools.
 *
 * @return void
 */
function mssf_add_webhook_log_page() {
	add_management_page(
		'MSSF Webhook Log',       // Page title.
		'Webhook Log',            // Menu title.
		'manage_options',         // Capability required.
		'mssf-webhook-log',       // Menu slug.
		'mssf_render_webhook_log' // Render callback.
	);
}
add_action( 'admin_menu', 'mssf_add_webhook_log_page' );

/**
 * Render the Webhook Log admin page.
 *
 * Displays a simple HTML table with the last 20 log entries stored
 * in the `mssf_webhook_log` option.
 *
 * @return void
 */
function mssf_render_webhook_log() {
	// Only administrators should see this.
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'You do not have permission to view this page.', 'mssf' ) );
	}

	$log = get_option( 'mssf_webhook_log', array() );

	echo '<div class="wrap">';
	echo '<h1>' . esc_html__( 'MSSF Webhook Log', 'mssf' ) . '</h1>';
	echo '<p>' . esc_html__( 'Last 20 GitHub Actions deploy webhook attempts.', 'mssf' ) . '</p>';

	if ( empty( $log ) ) {
		echo '<p><em>' . esc_html__( 'No webhook attempts recorded yet.', 'mssf' ) . '</em></p>';
	} else {
		echo '<table class="widefat fixed striped">';
		echo '<thead><tr>';
		echo '<th>' . esc_html__( 'Timestamp', 'mssf' ) . '</th>';
		echo '<th>' . esc_html__( 'Post ID', 'mssf' ) . '</th>';
		echo '<th>' . esc_html__( 'Status / Error', 'mssf' ) . '</th>';
		echo '</tr></thead>';
		echo '<tbody>';

		// Show newest entries first.
		foreach ( array_reverse( $log ) as $entry ) {
			echo '<tr>';
			echo '<td>' . esc_html( $entry['time'] ) . '</td>';
			echo '<td>' . esc_html( $entry['post_id'] ) . '</td>';
			echo '<td>' . esc_html( $entry['status'] ) . '</td>';
			echo '</tr>';
		}

		echo '</tbody></table>';
	}

	echo '</div>';
}


/*
|--------------------------------------------------------------------------
| 8. Login Protection / URL Obfuscation
|--------------------------------------------------------------------------
|
| Obscures the standard /wp-admin and wp-login.php login pages.
| Visiting /star will drop a session cookie and redirect to the login form.
| Any other direct visits to wp-login.php/wp-admin will be redirected
| to the public blog page at https://mssf.com.ng/blog.
|
*/

/**
 * Hide standard login/admin paths unless accessed via the secret /star endpoint.
 *
 * Runs very early during muplugins_loaded to block unauthorized visits.
 *
 * @return void
 */
function mssf_secure_login_protection() {
	$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '';

	// 1. Intercept the secret URL /star
	if ( preg_match( '/\/star\/?$/i', strtok( $request_uri, '?' ) ) || isset( $_GET['star'] ) ) {
		// Set a secure, httpOnly cookie valid for 1 hour
		setcookie( 'mssf_star_access', '1', time() + 3600, COOKIEPATH, COOKIE_DOMAIN, is_ssl(), true );
		
		// Redirect to standard login URL
		wp_safe_redirect( wp_login_url() );
		exit;
	}

	// 2. Protect wp-login.php from unauthorized access
	$is_login_page = ( isset( $_SERVER['SCRIPT_NAME'] ) && strpos( $_SERVER['SCRIPT_NAME'], 'wp-login.php' ) !== false );

	if ( $is_login_page ) {
		// Allow login submissions (POST) and already logged-in users to proceed
		if ( 'POST' === $_SERVER['REQUEST_METHOD'] || is_user_logged_in() ) {
			return;
		}

		// Check for the secret cookie
		if ( ! isset( $_COOKIE['mssf_star_access'] ) ) {
			wp_redirect( 'https://mssf.com.ng/blog', 302 );
			exit;
		}
	}
}
add_action( 'muplugins_loaded', 'mssf_secure_login_protection' );

