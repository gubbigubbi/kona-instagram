<?php

register_block_type('cgb/block-gutengram', array(
	'render_callback' => 'gutengram_render_callback',
		'attributes' => array(
				'numberCols' => array(
					'type' => 'number',
					'default'	=> '4'
				),
				'thumbs'=> array(
						'type' => 'array'
				)
		)
	)
);

function gutengram_render_callback( $attributes ){
	
	$thumbs = $attributes[ 'thumbs' ];
	$numberCols = $attributes[ 'numberCols' ];
	
	$markup = '<div class="display-grid" style="grid-template-columns: repeat('.$numberCols.', 1fr)">';

	foreach( $thumbs as $thumb ) {
		$markup .= '<img
		key='.$thumb['id'].'
		src='.$thumb['images']['standard_resolution']['url'].'
		alt='.$thumb['caption'].'
		/>';
	}

	return "{$markup}</div>";
}