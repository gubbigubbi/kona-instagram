=== Plugin Name ===
Contributors: gubbigubbi 	
Tags: gutenberg, instagram, instagram feed
Requires at least: 4.9.6
Tested up to: 5.4.2
Stable tag: 1.7
Requires PHP: 5.6
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Easily and instantly preview your instagram feed live within the new editor experience. Adjust settings as needed such as the number of columns and the spacing. More features to come!

== Description ==

## Kona: Instagram Feed for Gutenberg
Easily and instantly preview your Instagram feed live within the new editor (Gutenberg) experience. Adjust settings as needed such as the number of columns and the spacing. More features to come. 

###Wan't to see a feature?
###### Feel free to tweet and say 👋 at me [@RhysClay](https://twitter.com/rhysclay/)
###### Or submit (even better) submit a PR!

###Our Awesome Collaborators 
Some people who have helped along the way
* [@yonatron](https://wordpress.org/support/users/yonatron/)
* [@ahrengot]
* [@Forsvunnet](https://twitter.com/forsvunnet)
* [@allerj](https://twitter.com/allerj/)
* [@dingo_d](https://twitter.com/made_by_denis)
* [@dawizardguy]
* [@UXBox-Designj](https://github.com/UXBox-Design)

== Installation ==

Firstly make sure that you have the Gutenberg plugin installed.

1. Install the Kona plugin either via the WordPress plugin directory, or by uploading the files to your web server (in the /wp-content/plugins/ directory).
1. Activate the Kona plugin through the 'Plugins' screen in WordPress.
1. Add the Kona block to your editor.
1. Get an Instagram Access Token: To do this we suggest installing the Feed Them Social plugin by Slick Remix, then login to instagram and follow these steps [click here] (https://www.slickremix.com/docs/how-to-create-instagram-access-token/). Once you have a token, please paste it into the 'Instagram Access Token' setting. You can then deactivate the FTS plugin if needed.
1. Your Instagram feed will now show in the editor, adjust the settings to see how it will look before publishing.

== Frequently Asked Questions ==

= My feed isn't showing? =

Please make sure to add your Instagram access token the block settings. Once added your feed should show instantly (well pretty fast at least).

= How about X feature? =

We will continue adding features as requested. If you have a killer idea for a feature submit a support request and we will see what we can do.

= The feed looks funny in IE9 (Or other old browser)

This plugin is laid out using the new CSS Grid specification, we do not have plans to support older browsers as we believe they are holding back the web. However we can (if requested) release some code which you can add to your site's custom css in order to support certain browsers.

== Screenshots ==

1. Adding the Kona block to the editor.
1. Adjusting the block settings.

== Changelog ==

= 1.7 =
* Fixed bug with number of images not working on front end
* Allowed carousel albums to show in the gallery

= 1.6 =
* Updated to work with latest instagram API. Note: the user biography feature no longer works :(
* We need your help! This is a free plugin, and with the latest instagram API update, we cannot figure out how to retrieve an access token, if you can help this community project please feel free to contact us!

= 1.5 =
* New feauture: Captions!!!

= 1.4.1 =
* Added support for alignment - shoutout [@UXBox-Designj](https://github.com/UXBox-Design)

= 1.4 =
* Tightened caching technique, now works correctly!.
* Fixed php issue with image alt tags

= 1.3.1 =
* Name change due to copyright infringement.

= 1.3 =
* Fixed foreach loop error with no data
* Improved block icon

= 1.2.1 =
* Merged pull request which fixes 'undefinedIndex className' - shoutout [@Forsvunnet](https://twitter.com/forsvunnet)

= 1.1.1 =
* Removed unused variable $useThumbnails - shoutout [@dingo_d](https://twitter.com/made_by_denis)
* Added className to server rendered wrapper - shoutout [@dawizardguy]

= 1.1 =
* Fixed bug with profileContainer not being defined in server.php under some conditions.

= 1.0 =
* Fixed error caused by inactive gutenberg feature plugin
* Added feature: equal size images 🚀 - shoutout [@allerj](https://twitter.com/allerj/)
* Bumped PHP min version to 5.6, just cause

= 0.9 =
* Updated for WP 5.0 support

= 0.8 =
* Updated for Gberg 4.3 support

= 0.7 =
* Added background color option

= 0.6.1 =
* Fixed bug where new feed would be stuck in loading mode.

= 0.6 =
* Added checks for caption before rendering caption. Added loading spinner. Added icon.

= 0.5 =
* Added a nice hover effect to images

= 0.4 =
* Added profile & option to show/hide profile.

= 0.3 =
* Updated caching system to include user ID so multiple feeds would work.
* Updated editor to notify user if the Insta API returns an error
* Removed links from editor images as these could be accidentaly clicked

= 0.2 =
* Added a caching system to reduce the number of requests the Insta API.

= 0.1 =
* First release.

== Coming Soon ==
* Video thumbs???