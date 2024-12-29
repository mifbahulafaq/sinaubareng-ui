import React from 'react';
import DocViewer, { DocViewerRenderers  } from "@cyntler/react-doc-viewer";

const DocumentViewer = function({ docs }){
	// console.log(docs)
	return (
		<DocViewer 
			pluginRenderers={DocViewerRenderers }
			documents={docs}
			theme={{
				primary: "#5296d8",
				secondary: "#ffffff",
				tertiary: "#5296d899",
				textPrimary: "#black",
				textSecondary: "#5296d8",
				textTertiary: "#00000099",
				disableThemeScrollbar: false,
			}}
			style={{
				maxWidth: '850px',
				margin: "0 10px"
			}}
			
		/>
	)
}

export default React.memo(DocumentViewer);