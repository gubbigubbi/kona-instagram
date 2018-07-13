//import Inspector from './inspector';

const { Component } = wp.element;

const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl } = wp.components;

const { __ } = wp.i18n;

const token = '4034731230.1677ed0.95135604716e4d749262b4eb14658a4d';

export default class InstagramEdit extends Component {
	constructor() {
		super( ...arguments );
		this.onChangeImages = this.onChangeImages.bind( this );
	}

	componentDidMount() {
		this.fetchPhotos();
	}

	fetchPhotos( count ) {
		const _COUNT = count ? count : this.props.attributes.numberImages;
		return fetch(
			`https://api.instagram.com/v1/users/self/media/recent/?access_token=${ token }&count=${ _COUNT }`
		)
			.then( res => res.json() )
			.then( json => {
				this.props.setAttributes( {
					thumbs: json.data,
				} );
			} );
	}

	onChangeImages( numberImages ) {
		this.props.setAttributes( {
			numberImages,
		} );
		this.fetchPhotos( numberImages );
	}

	render() {
		const {
			attributes: { numberCols, numberImages, thumbs },
			className,
			setAttributes,
		} = this.props;

		return (
			<div className={ className }>
				<InspectorControls>
					<PanelBody title={ __( 'Layout Options' ) }>
						<RangeControl
							value={ numberCols }
							onChange={ numberCols => setAttributes( { numberCols } ) }
							min={ 1 }
							max={ 6 }
							step={ 1 }
							label={ __( 'Columns' ) }
						/>

						<RangeControl
							value={ numberImages }
							onChange={ this.onChangeImages }
							min={ 1 }
							max={ 20 }
							step={ 1 }
							allowReset="true"
							label={ __( 'Images' ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div
					className="display-grid"
					style={ {
						gridTemplateColumns: `repeat(${ numberCols }, 1fr)`,
					} }
				>
					{ thumbs.map( photo => {
						return (
							<img
								key={ photo.id }
								src={ photo.images.standard_resolution.url }
								alt={ photo.caption }
							/>
						);
					} ) }
				</div>
			</div>
		);
	}
}
