<?php
/**
 * MSSF — Constants to add to wp-config.php on cms.mssf.com.ng
 *
 * This file is NOT loaded by WordPress directly. It is a reference
 * document listing every constant the MSSF mu-plugin depends on.
 *
 * HOW TO USE:
 *   1. Open wp-config.php on your production server.
 *   2. Copy the define() lines below into wp-config.php BEFORE
 *      the line that says: "That's all, stop editing!"
 *   3. Replace placeholder values (marked XXXX) with real credentials.
 *
 * @package MSSF
 */

// -----------------------------------------------------------------------
// GitHub Deploy Token
// -----------------------------------------------------------------------
// Used by the save_post webhook in the mu-plugin to trigger a GitHub
// Actions repository_dispatch event, which rebuilds the Next.js frontend.
//
// Generate a fine-grained personal access token at:
//   https://github.com/settings/tokens
//
// Required permission: Contents → Read and write (for repository_dispatch).
// Scope the token to the iamGoldenOla/mssf repository only.
define( 'MSSF_GH_DEPLOY_TOKEN', 'ghp_XXXXXXXXXXXX' );

// -----------------------------------------------------------------------
// Disable File Editing (Security Hardening)
// -----------------------------------------------------------------------
// Prevents anyone — even administrators — from editing plugin/theme files
// via the wp-admin code editor.  If the site is compromised, this stops
// attackers from injecting code through the dashboard.
define( 'DISALLOW_FILE_EDIT', true );

// -----------------------------------------------------------------------
// Force SSL for Admin
// -----------------------------------------------------------------------
// Ensures all wp-admin and wp-login.php traffic is served over HTTPS.
// The server must have a valid SSL certificate (e.g. Let's Encrypt).
define( 'FORCE_SSL_ADMIN', true );
