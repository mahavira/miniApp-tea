<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'miniapptea');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '18f334d7f7');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'JSHV8xfVfuDehl1|f(3dk3;|a;gUk*T_}_OMXg/#Y)opWAiKIqo-M*K[q|gh%[ce');
define('SECURE_AUTH_KEY',  'Dq0Mur^MSL=_Q$;D>mn03:]vl-(TEtXwf=#DXAR*Q6yv}O/)YiI#@tK8g#mIo(+>');
define('LOGGED_IN_KEY',    'Cx_Ha4t<N%k}{1pc}lTxxW~ AUJ}@3[lr>f:? z6|K2(Qg`#[WXj~*.6)![qQ6=/');
define('NONCE_KEY',        'l@+[+idq+P2F26]~UDrPcTI29h$/l1p/15BYK8_oY4/vRa<<i;^=DV%rgjra.>m}');
define('AUTH_SALT',        'Z@c|fncT9SJfYY/z 3LU=aa~QzsAR<7RR6Apj1.Y1=IsB/k-%xbLZ/mb|r0e@z*M');
define('SECURE_AUTH_SALT', '|kT9*<j=*k%c3Uz@tC{4&(o7<W%A#G{%JBHPXyqqRY;-uvsv#q9HuXORZIqaaL[Q');
define('LOGGED_IN_SALT',   'd_,X^$*>6eW{$;GX,BD:i< 4@n,*:&dJ7AzzG4LrHM#D|)DIp95|LQ?:3wXZpO*Q');
define('NONCE_SALT',       'J^.KLKwFtB3oNzm(lC6Vpt$:lBZx-n?=2y|?M,h?Z=po3#0(.lUi*/%Ec!pa87no');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_tea_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
