const { Component, Fragment } = wp.element;

const { InspectorControls, PanelColorSettings } = wp.editor;
const {
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	ToggleControl,
	Spinner
} = wp.components;

const { __ } = wp.i18n;

export default class InstagramEdit extends Component {
	state = {
		loading: true,
		apiResponseCode: 200,
		apiErrorMessage: ""
	};

	// On load get the thumbs and bio
	componentDidMount() {
		this.fetchPhotos();
		this.fetchBio();
	}

	fetchPhotos(count, token) {
		const _COUNT = count ? count : this.props.attributes.numberImages;
		const _TOKEN = token ? token : this.props.attributes.token;

		if (!_TOKEN) {
			return false;
		}

		return fetch(
			`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${_TOKEN}`
			//`https://api.instagram.com/v1/users/self/media/recent/?access_token=${_TOKEN}&count=${_COUNT}`
		)
			.then(res => res.json())
			.then(json => {
				console.log(json);

				if (json.data) {
					this.setState({
						apiResponseCode: 200, // manually setting this for now
						loading: false
					});

					if (json.data.length > 0) {
						this.props.setAttributes({
							thumbs: json.data
						});
					} else {
						this.props.setAttributes({
							thumbs: []
						});

						this.setState({
							apiResponseCode: 500 // manual
							// apiErrorMessage: json.meta.error_message
						});
					}
				}
			});
	}

	fetchBio() {
		const _TOKEN = this.props.attributes.token;

		if (!_TOKEN) {
			return false;
		}

		return fetch(
			`https://graph.instagram.com/me?fields=id,username&access_token=${_TOKEN}`
			//`https://api.instagram.com/v1/users/self/?access_token=${_TOKEN}`
		)
			.then(res => res.json())
			.then(json => {
				if (json.meta && json.meta.code === 200) {
					this.props.setAttributes({
						profile: json.data
					});
				} else {
					this.props.setAttributes({
						profile: []
					});
				}
			});
	}

	onChangeToken = token => {
		this.props.setAttributes({
			token
		});
		this.fetchPhotos(this.props.attributes.numberImages, token);
	};

	onChangeImages = numberImages => {
		this.props.setAttributes({
			numberImages
		});
		this.fetchPhotos(numberImages);
	};

	onChangeShowProfile = showProfile => {
		this.props.setAttributes({
			showProfile
		});
		this.fetchBio();
	};

	renderImage = photo => {


		const { hasEqualImages, backgroundColor, showCaptions } = this.props.attributes;

		if (photo.media_type === 'IMAGE' || 'CAROUSEL_ALBUM') { // for now dont allow carousels or videos
			return (
				<div
					className={
						"kona-image-wrapper " +
						(hasEqualImages ? "has-equal-images" : "")
					}
					style={{ backgroundColor }}
					key={photo.id}
				>
					<img
						className="kona-image"
						src={photo.media_url}
						alt={photo.caption ? photo.caption : ""}
					/>
					<div className="kona-image-overlay">
						{showCaptions && (
							<div className="kona-image-caption">
								<span className="kona-image-caption_text">
									{photo.caption}
								</span>
								<span className="kona-image-caption_likes"></span>
							</div>
						)}
					</div>
				</div>
			);
		}
	}

	render() {
		const {
			attributes: {
				token,
				numberCols,
				numberImages,
				hasEqualImages,
				thumbs,
				gridGap,
				showProfile,
				profile,
				backgroundColor,
				showCaptions
			},
			className,
			setAttributes
		} = this.props;

		const { apiResponseCode, apiErrorMessage, loading } = this.state;

		let container;

		if (token && apiResponseCode === 200) {
			if (loading) {
				container = (
					<p className={className}>
						<Spinner />
						{__("Loading feed")}
					</p>
				);
			} else {
				container = (
					<div
						className="display-grid kona-grid"
						style={{
							gridTemplateColumns: `repeat(${numberCols}, 1fr)`,
							marginLeft: `-${gridGap}px`,
							marginRight: `-${gridGap}px`,
							gridGap: `${gridGap}px`
						}}
					>
						{thumbs &&
							thumbs.slice(0, numberImages).map(photo => {

								return this.renderImage(photo);
							})}
					</div>
				);
			}
		} else if (apiResponseCode !== 200) {
			container = (
				<div>🤦🏻‍♀️ Ooops something went wrong: {apiErrorMessage} 🤦🏻‍♂️</div>
			);
		} else {
			container = (
				<div className={className}>
					<p>To get started please add an Instagram Access Token.{" "}</p>
					<p>To do this we suggest installing the Feed Them Social plugin by Slick Remix, <a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.slickremix.com/docs/how-to-create-instagram-access-token/"
					>then following these steps.</a></p>
					<p>Once you have a token, please paste it into the 'Instagram Access
					Token' setting.</p>
					<p>You can then deactivate the FTS plugin if needed.</p>
				</div>
			);
		}

		let profileContainer;

		// if (showProfile) {
		// 	profileContainer = (
		// 		<div className="display-grid kona-profile-container">
		// 			<div className="kona-profile-picture-container">
		// 				<img
		// 					className="kona-profile-picture"
		// 					src={profile.profile_picture}
		// 					alt={profile.full_name}
		// 				/>
		// 			</div>
		// 			<div className="kona-bio-container">
		// 				<h3>{profile.username}</h3>
		// 				<p>{profile.bio}</p>
		// 			</div>
		// 		</div>
		// 	);
		// } else {
		// 	profileContainer = <Fragment />;
		// }

		// removing profile for now, unable to access with new instagram api
		profileContainer = <Fragment />;

		return (
			<div className={className}>
				<InspectorControls>
					<PanelBody title={__("Step 1: Access Tokens")}>
						<TextControl
							label={__("Instagram Access Token")}
							value={token}
							onChange={this.onChangeToken}
						/>
					</PanelBody>
					<PanelBody title={__("Step 2: Layout Options")}>
						<RangeControl
							value={numberCols}
							onChange={numberCols => setAttributes({ numberCols })}
							min={1}
							max={6}
							step={1}
							label={__("Columns")}
						/>

						<PanelRow>
							Note: Videos will be skipped in the total image count (these will be added in future plugin versions)
						</PanelRow>

						<PanelRow>
							<RangeControl
								value={numberImages}
								onChange={this.onChangeImages}
								min={1}
								max={20}
								step={1}
								allowReset="true"
								label={__("Images")}
							/>
						</PanelRow>

						<PanelRow>
							<RangeControl
								value={gridGap}
								onChange={gridGap => setAttributes({ gridGap })}
								min={0}
								max={20}
								step={1}
								label={__("Image spacing (px)")}
							/>
						</PanelRow>

						{/* <ToggleControl
							label={__("Show profile?")}
							checked={showProfile}
							help={__(
								"Show your profile details such as your biography and profile photo."
							)}
							onChange={this.onChangeShowProfile}
						/> */}

						<ToggleControl
							label={__("Show captions?")}
							checked={showCaptions}
							help={__("Show image captions on hover?")}
							onChange={showCaptions => setAttributes({ showCaptions })}
						/>

						<ToggleControl
							label={__("Show equal sized images?")}
							checked={hasEqualImages}
							help={__("Use square thumbnails for each image?")}
							onChange={hasEqualImages => setAttributes({ hasEqualImages })}
						/>

						<PanelColorSettings
							title={__("Image Background")}
							colorSettings={[
								{
									value: backgroundColor,
									onChange: colorValue =>
										setAttributes({ backgroundColor: colorValue }),
									label: __("Background Color")
								}
							]}
						/>
					</PanelBody>
				</InspectorControls>
				{profileContainer}
				{container}
			</div>
		);
	}
}
