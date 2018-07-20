//import Inspector from './inspector';
const { Component } = wp.element;

const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl, TextControl } = wp.components;

const { __ } = wp.i18n;

export default class InstagramEdit extends Component {
	constructor() {
		super( ...arguments );
		this.onChangeImages = this.onChangeImages.bind( this );
		this.onChangeToken = this.onChangeToken.bind( this );

		this.state = {
			apiResponseCode: 200,
			apiErrorMessage: '',
		};
	}

	componentDidMount() {
		this.fetchPhotos();
	}

	fetchPhotos( count, token ) {
		const _COUNT = count ? count : this.props.attributes.numberImages;
		const _TOKEN = token ? token : this.props.attributes.token;

		if ( ! _TOKEN ) {
			return false;
		}

		return fetch(
			`https://api.instagram.com/v1/users/self/media/recent/?access_token=${ _TOKEN }&count=${ _COUNT }`
		)
			.then( res => res.json() )
			.then( json => {
				this.setState( {
					apiResponseCode: json.meta.code,
				} );

				if ( json.meta.code === 200 ) {
					this.props.setAttributes( {
						thumbs: json.data,
					} );
				} else {
					this.props.setAttributes( {
						thumbs: [],
					} );

					this.setState( {
						apiErrorMessage: json.meta.error_message,
					} );
				}
			} );
	}

	onChangeToken( token ) {
		this.props.setAttributes( {
			token,
		} );
		this.fetchPhotos( this.props.attributes.numberImages, token );
	}

	onChangeImages( numberImages ) {
		this.props.setAttributes( {
			numberImages,
		} );
		this.fetchPhotos( numberImages );
	}

	render() {
		const {
			attributes: { token, numberCols, numberImages, thumbs, gridGap },
			className,
			setAttributes,
		} = this.props;

		const { apiResponseCode, apiErrorMessage } = this.state;

		let container;

		if ( token && apiResponseCode === 200 ) {
			container = (
				<div
					className="display-grid kona-grid"
					style={ {
						gridTemplateColumns: `repeat(${ numberCols }, 1fr)`,
						marginLeft: `-${ gridGap }px`,
						marginRight: `-${ gridGap }px`,
					} }
				>
					{ thumbs &&
						thumbs.map( photo => {
							return (
								<span
									//href={ photo.link } - removed
									key={ photo.id }
								>
									<img
										className="kona-image"
										src={ photo.images.standard_resolution.url }
										alt={ photo.caption.text }
										style={ {
											padding: `${ gridGap }px`,
										} }
									/>
								</span>
							);
						} ) }
				</div>
			);
		} else if ( apiResponseCode !== 200 ) {
			container = <div>Ooops something went wrong: { apiErrorMessage }</div>;
		} else {
			container = (
				<div className={ className }>
					To get started please add an Instagram Access Token.{ ' ' }
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="http://instagram.pixelunion.net/"
					>
						To do this login to instagram and click here.
					</a>
					Once you have a token, please paste it into the 'Instagram Access
					Token' setting.
				</div>
			);
		}

		return (
			<div className={ className }>
				<InspectorControls>
					<PanelBody title={ __( 'Step 1: Access Tokens' ) }>
						<TextControl
							label={ __( 'Instagram Access Token' ) }
							value={ token }
							onChange={ this.onChangeToken }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Step 2: Layout Options' ) }>
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

						<RangeControl
							value={ gridGap }
							onChange={ gridGap => setAttributes( { gridGap } ) }
							min={ 0 }
							max={ 20 }
							step={ 1 }
							label={ __( 'Image spacing (px)' ) }
						/>
					</PanelBody>
				</InspectorControls>
				{ container }
			</div>
		);
	}
}
