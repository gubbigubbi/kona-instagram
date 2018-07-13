/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, PanelRow, RangeControl, ToggleControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	render() {
		const {
			attributes: { numberCols, numberImages },
			onChangeCols,
			onChangeImages
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody title={__('Layout Options')}>
					<PanelRow>
						<RangeControl
							value={numberCols}
							onChange={onChangeCols}
							min={1}
							max={6}
							step={1}
							allowReset="true"
							label={__('Number of Columns')}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		);
	}
}
