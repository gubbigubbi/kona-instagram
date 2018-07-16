<?php
register_block_type('cgb/block-gutengram', array(
	'render_callback' => 'gutengram_render_callback',
		'attributes' => array(
				'numberCols' => array(
					'type' => 'number',
					'default'	=> '4' // nb: a default is needed!
				),
				'thumbs'=> array(
						'type' => 'array',
						'default' => []
				),
				'gridGap' => array(
					'type' => 'number',
					'default'	=> '0'
				),
		)
	)
);

function gutengram_render_callback( $attributes ){
	
	$thumbs 		= $attributes[ 'thumbs' ];
	$numberCols = $attributes[ 'numberCols' ];
	$gridGap 		= $attributes['gridGap'];

	$markup = '<div class="display-grid" 
	style="grid-template-columns: repeat('.esc_attr($numberCols).', 1fr); 
	margin-left: -'.esc_attr($gridGap).'px; 
	margin-right: -'.esc_attr($gridGap).'px";>';

	foreach( $thumbs as $thumb ) {
		$markup .= '<img
		key='.esc_attr($thumb['id']).'
		src='.esc_attr($thumb['images']['standard_resolution']['url']).'
		alt='.esc_attr($thumb['caption']).'
		style="padding: '.esc_attr($gridGap).'px"
		/>';
	}

	return "{$markup}</div>";
}