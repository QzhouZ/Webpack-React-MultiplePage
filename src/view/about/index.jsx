import "./style/index.less";
import React from 'react';
import ReactDOM from 'react-dom';

class Content extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: [{
	    		name: '关于'
	    	},{
	    		name: '我们'
	    	}]
		};
	}
	componentDidMount() {

	}
	render() {
		let dataList = this.state.data.map((item, index) => {
			return (
				<div className="about-box" key={index}>
					{item.name}
				</div>
			);
		});
		return (
			<div className="about-content">
				{dataList}
			</div>
		);
	}

};

ReactDOM.render (
	<Content / > , 
	document.getElementById('app')
);
