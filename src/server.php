<?php
function kona_register_block()
{

    // Only load if Gutenberg is available.
    if (!function_exists('register_block_type')) {
        return;
    }

    register_block_type('cgb/kona-instagram-for-gutenberg', array(
        'render_callback' => 'kona_render_callback',
        'attributes' => array(
            'numberCols' => array(
                'type' => 'number',
                'default' => '4', // nb: a default is needed!
            ),
            'token' => array(
                'type' => 'string',
                'default' => '',
            ),
            'hasEqualImages' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'numberImages' => array(
                'type' => 'number',
                'default' => 4,
            ),
            'gridGap' => array(
                'type' => 'number',
                'default' => 0,
            ),
            'showProfile' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'backgroundColor' => array(
                'type' => 'string',
                'default' => 'transparent',
            ),
            'showCaptions' => array(
                'type' => 'boolean',
                'default' => false,
            ),
        ),
    )
    );

}

add_action('init', 'kona_register_block');

/**
 * Generic data fetching wrapper
 * Uses the WP-API for fetching
 */
function kona_fetchData($url)
{
    $request = wp_remote_get($url);

    if (is_wp_error($request)) {
        return false;
    }

    return wp_remote_retrieve_body($request);
}

/**
 * Caching functions
 * The number of images is used as a suffix in the case that the user
 * adds/removes images and expects a refreshed feed.
 */
function kona_add_to_cache($result, $suffix = '', $expire = (60 * 60 * 6))
{
    set_transient('kona-api_' . $suffix, $result, $expire);
}

function kona_get_from_cache($suffix = '')
{
    return get_transient('kona-api_' . $suffix);
}

/**
 * Server side rendering functions
 */
function kona_render_callback(array $attributes)
{
    $attributes = wp_parse_args(
        $attributes,
        [
            'token' => '',
            'hasEqualImages' => false,
            'numberImages' => 4,
            'gridGap' => 0,
            'showProfile' => false,
            'backgroundColor' => 'transparent',
            'className' => '',
            'align' => '',
            'showCaptions' => false,
        ]
    );
    $token = $attributes['token'];

    $hasEqualImages = $attributes['hasEqualImages'] ? 'has-equal-images' : '';
    $numberImages = $attributes['numberImages'];
    $numberCols = $attributes['numberCols'];
    $gridGap = $attributes['gridGap'];
    $showProfile = $attributes['showProfile'];
    $className = $attributes['className'];
    $align = $attributes['align'];
    $showCaptions = $attributes['showCaptions'];

    // originally we got the user id from the token but this no longer possible

    // create a unique id so there is no double ups
    $suffix = $token . '_' . $numberImages;

    if (!kona_get_from_cache($suffix)) {
        // no valid cache found
        // hit the network
        $result = json_decode(kona_fetchData("https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token={$token}"));
        // if($showProfile) { // removed for now
        //     $result->profile = json_decode(kona_fetchData("https://api.instagram.com/v1/users/self?access_token={$token}"));
        // }
        kona_add_to_cache($result, $suffix); // add the result to the cache
    } else {
        $result = kona_get_from_cache($suffix); // hit the cache
    }

    $thumbs = $result->data;
    $profile = ''; // our empty profile container
    $profileContainer = ''; // initialize as an empty string to prevent server errors

    // if($showProfile) {
    //     $profile     = $result->profile->data;

    //     $profileContainer = '<a href="https://instagram.com/'.$profile->username.'" target="_blank" class="kona-profile-container display-grid align'.$align.'">
    //         <div class="kona-profile-picture-container">
    //             <img
    //                 class="kona-profile-picture"
    //                 src="'.esc_attr($profile->profile_picture).'"
    //                 alt="'.esc_attr($profile->full_name).'"
    //             />
    //         </div>
    //         <div class="kona-bio-container">
    //             <h3>'.$profile->username.'</h3>
    //             <p>'.$profile->bio.'</p>
    //         </div>
    //     </a>';
    // }

    $imageContainer = '<div class="wp-block-cgb-kona-instagram-for-gutenberg ' . $attributes['className'] . ' align' . $align . '">
	<div class="display-grid kona-grid"
	style="grid-template-columns: repeat(' . esc_attr($numberCols) . ', 1fr);
	margin-left: -' . esc_attr($gridGap) . 'px;
	margin-right: -' . esc_attr($gridGap) . 'px;
	grid-gap: ' . esc_attr($gridGap) . 'px";
	>';

    if (is_array($thumbs)) {
        foreach ($thumbs as $thumb) {

            $caption = $showCaptions && $thumb->caption ? '<div class="kona-image-caption">
			<span class="kona-image-caption_text">
				' . $thumb->caption . '
			</span>
			<span class="kona-image-caption_likes">
			</span>
		</div>' : '';

            $image = esc_attr($thumb->media_url);

            $imageContainer .= '
			<a class="kona-image-wrapper ' . $hasEqualImages . '" href="' . esc_attr($thumb->permalink) . '"
			target="_blank" rel="noopener noreferrer"
			style="background-color: ' . esc_attr($attributes['backgroundColor']) . '">
				<img
				class="kona-image"
				key="' . esc_attr($thumb->id) . '"
				src="' . $image . '"
				alt="' . (empty($thumb->caption) ? '' : esc_attr($thumb->caption)) . '"
				/>
				<div class="kona-image-overlay">

				' . $caption . '

				</div>
			</a>';
        }
    }

    return "{$profileContainer}{$imageContainer}</div></div>";
}
