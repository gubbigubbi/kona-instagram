<?php
register_block_type('cgb/kona-instagram-for-gutenberg', array(
	'render_callback' => 'gutengram_render_callback',
		'attributes' => array(
				'numberCols' => array(
					'type' 		=> 'number',
					'default'	=> '4' // nb: a default is needed!
				),
				'token'=> array(
						'type' 		=> 'string',
						'default' => ''
				),
				'numberImages' => array(
					'type' 		=> 'number',
					'default' => 4
				),
				'gridGap' => array(
					'type' 		=> 'number',
					'default'	=> 0
				),
		)
	)
);

function fetchData($url) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 20);
	$result = curl_exec($ch);
	curl_close($ch); 
	return $result;
}

function gutengram_render_callback( $attributes ){
	
	$token				= $attributes[ 'token' ];
	$numberImages	= $attributes[ 'numberImages' ];
	$numberCols 	= $attributes[ 'numberCols' ];
	$gridGap 			= $attributes[ 'gridGap' ];

	$result = json_decode(fetchData("https://api.instagram.com/v1/users/self/media/recent/?access_token={$token}&count={$numberImages}"));
	$thumbs = $result->data;

	$markup = '<div class="wp-block-cgb-kona-instagram-for-gutenberg">
	<div class="display-grid" 
	style="grid-template-columns: repeat('.esc_attr($numberCols).', 1fr); 
	margin-left: -'.esc_attr($gridGap).'px; 
	margin-right: -'.esc_attr($gridGap).'px";>';

	foreach( $thumbs as $thumb ) {
		$markup .= '<img
		key='.esc_attr($thumb->id).'
		src='.esc_attr($thumb->images->standard_resolution->url).'
		alt='.esc_attr($thumb->caption->text).'
		style="padding: '.esc_attr($gridGap).'px"
		/>';
	}

	return "{$markup}</div></div>";
}