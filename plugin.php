<?php
/**
 * Plugin Name: Kona Gallery Block
 * Plugin URI: https://github.com/gubbigubbi/kona-instagram
 * Description: Easily add and preview your instagram feed live within the new editor experience.
 * Author: gubbigubbi
 * Author URI: https://github.com/gubbigubbi/
 * Version: 1.7
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'src/init.php';
