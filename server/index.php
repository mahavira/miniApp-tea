<?php
/**
 * Front to the WordPress application. This file doesn't do anything, but loads
 * wp-blog-header.php which does and tells WordPress to load the theme.
 *
 * @package WordPress
 */

/**
 * Tells WordPress to load the WordPress theme and output it.
 *
 * @var bool
 */
define('WP_USE_THEMES', true);
/**
 * 明雄修改
 * 为了兼容腾讯云小程序不可配置nginx问题
 * 解决：根据rest_route参数添加到全局变量中
 *
 * @package WordPress
 */

if (!empty($_GET['rest_route'])) {
  $rest_router = '/wp-json' . $_GET['rest_route'];
  $GLOBALS['_SERVER']['REQUEST_URI'] = $rest_router;
  $_SERVER['REQUEST_URI'] = $rest_router;
  unset($GLOBALS['_GET']['rest_route']);
  unset($_GET['rest_route']);
}
// var_dump($GLOBALS,$_SERVER);

// $GLOBALS['ssjedcw'] = $_GET;
// var_dump($_GET);
/** Loads the WordPress Environment and Template */
require( dirname( __FILE__ ) . '/wp-blog-header.php' );
