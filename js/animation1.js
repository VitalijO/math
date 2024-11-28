  import zim from "https://zimjs.org/cdn/015/zim";

// REFERENCES for ZIM at https://zimjs.com
// see https://zimjs.com/intro.html for an intro example
// see https://zimjs.com/learn.html for video and code tutorials
// see https://zimjs.com/docs.html for documentation
// see https://codepen.io/topic/zim/ for ZIM on CodePen
	

const frame = new Frame(FILL, 2000, 768, black, black, ready, ["cats1.png", "cats2.png", "bats1.png", "bats2.png"], "https://assets.codepen.io/2104200/");
function ready() {

	// given F (Frame), S (Stage), W (width), H (height)
   // put code here
	
	const cats = new Tile([new Pic("cats1.png"), new Pic("cats2.png")], 2, 1, -2, 0, true).scaleTo().addTo();
	const bats = new Tile([new Pic("bats1.png"), new Pic("bats2.png")], 2, 1, -2, 0, true).scaleTo().addTo();
	const s1 = new Scroller(cats);
	const s2 = new Scroller(bats, -1);
	s2.backing1.ble("lighten");
	s2.backing2.ble("lighten");	
	
} 
 

 
	 
 