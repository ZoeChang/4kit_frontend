import React, { Component } from 'react';
// BS Component
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

// my Component
import Selects from './Selects.js';
import Attr from './Attr_y.js';
import SpecsList from './Categoryspec_y.js';

// Attrs props:
// attr_arr: [{},{},{}...]
class Attrs extends Component {
	constructor(props) {
		super(props);
		this.AttrsHandle = this.AttrsHandle.bind(this);
		this.state = {};
	}

	AttrsHandle(e) {
		var change = {};
		var attrName = e.target.name;
		var attrValue = e.target.value;

		if (e.target.type === "checkbox"){
			var prepAttrValue = this.state[attrName];

			if (prepAttrValue === undefined ){
				change[attrName] = [];
			} else {
				change[attrName] = prepAttrValue;
			}
			
			var valueIndex = change[attrName].indexOf(attrValue);
			if ( valueIndex > -1 ){
				change[attrName].splice(valueIndex, 1);
			} else {
				change[attrName].push(attrValue);
			}
			
			this.setState( change ,function(){console.log(this.state)} );

		} else {
			change[attrName] = attrValue;
			this.setState( change ,function(){console.log(this.state)});

		}

	}

	render(){
    return(
        this.props.attr_arr.map( (obj,index) => 
			<Attr attr={obj} key={index} onChange={this.AttrsHandle}/>
		)
    );
    }
}

// Spec props:
// api
// sub
class Spec extends Component {
	// onchanged handle
	constructor(props) {
        super(props);
        this.state = {
			// 假設 constraint 是單選 1/複選 2
			specAttrs: [
				{
				"name": "品牌",
				"values": [
				"Amuzinc 酷比樂", "Fisher 費雪","Gigo 智高", "GOGOTOYS", "INTEX","Lamaze 拉梅茲", "plan toy", "Redbox","Tebbys & Co.", "Weplay","people","WOW Toys", "ALEX","B.Toys", "GreenToys & Eats", "KID ART","Radio Flyer", "Sprig Toys", "Under The Nile", "Melissa & Doug", "樂兒學",
				"GIOTTO", "Trudi","MICKI", "beleduc 貝樂多", "Hapé Eco", "LYRA", "愛培愛傑卡", "寶貝樂","EDTOY 愛迪", "LEGO 樂高", "CHUCK&FRIENDS", "FurReal Friends", "MB Games", "PlaySkool 兒樂寶", "Play-Doh 培樂多", "MY LITTLE PONY", "Alex", "BanBao", "Edtoy", "Nanoblock", "Wonderful 玩德瘋", "班恩傑尼",
				"Alex", "B.Toys", "RadioFlyer", "Hape 愛傑卡", "Boyds", "CRAFTHOLIC", "Ganz", "GUND", "CloudB.", "航海王", "復仇者聯盟", "星際大戰", "People", "Poli", "LINE","Takara Tomy","湯瑪士", "變型金剛", "麵包超人", "藍色小精靈", "任天堂", "哆啦 A 夢", "神奇寶貝", "Snoopy", "海綿寶寶", "迪士尼", "其他"],
				"constraint": 1,
				"textmax": "0",
				"textmin": "0",
				"required": true
				},
				{
				"name": "AA",
				"values": ["AAAA", "BBBB","CCC", "DDDD", "EEEE","GGGG", "PPPP"],
				"constraint": 2,
				"textmax": "0",
				"textmin": "0",
				"required": false
				}
			]
		};

		// this.handleSubChange = this.handleSubChange.bind(this);
		
		
	}

	shouldComponentUpdate(nextProps, nextState){
		return nextProps.sub !== this.props.sub
	}

	// handleSubChange(event){
	// 	this.setState({sub: event.target.value});
	// }

	

	render() {
	var api = `${this.props.api}${this.props.sub}`;
	return(
		<form>
			{/* chooes 商品規格表 */}
			<SpecsList api={api}/>

			{/* show 規格項目 */}
			<Attrs attr_arr={this.state.specAttrs}/>

		</form>
		
	);
	}
	
}

export default Spec;