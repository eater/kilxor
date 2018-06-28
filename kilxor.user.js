// ==UserScript== 
// @name           kilxor_20180628
// @include        https://ilx.wh3rd.net/* 
// @include        https://ilx.p3r.net/*
// @include        https://www.ilxor.com/*
// @include        https://ilxor.com/*
// ==/UserScript==  

// YOU NEED TO MODIFY THE fules LINE BELOW
// =======================================
// NB Names are now regular expressions so they should look like:
// /oog/	- match a part of name
// /^koo/	- match start of name
// /ogs$/	- match end of name
// /^koogs$/	- match entire name
// /\uABCD/	- match unicode character ABCD (hexadecimal)
var fules = [/noob/, /luser_name_here];

// set to true if you want no mention of deleted posts
var nuke = true;

var posts;
// <em class='name'><a href='/ILX/Pages/webmail.jsp?messageid=33&boardid=40&threadid=52468'>lfam</a></em>
// get all posts
posts = document.evaluate("//*[@class='posterinfo']/*[@class='name']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

blocked = false;
var count = 0
if (posts.snapshotLength != 0) {
	count++;
	//alert("Posts: " + posts.snapshotLength);	// acd DEBUG
	for (var i = 0; i < posts.snapshotLength; i++) {
		var thisLink = posts.snapshotItem(i);
		//alert("ThisLink: " + thisLink);	// acd DEBUG
		var poster = thisLink.firstChild.firstChild.nodeValue;
	
		if (poster != null) {
			for(var k = 0; k < fules.length; k++) {
				fule = fules[k];
				//alert("Poster: [" + poster + "] Fule: [" + fule + "]");	// acd DEBUG
				// if this post belongs to this fule then blank it
				if (poster.match(fule)) {
					// find enclosing message
					div = thisLink;
					do {
						div = div.parentNode;
						//alert("Div:" + div + " : " + div.className);
					} while (div.className != "message");
					if (nuke) {
						div.hidden = true;
					} else {
						div.innerHTML = "<div>Post by " + poster + " deleted. " + div.querySelector('.bookmark').outerHTML + "<br /><hr/></div>";
					}
					blocked = true;
					break;
				}
			}
		}
	}
	if (blocked == true) {
		// there were blocked messages - display message at top of file
		var logo = document.createElement("div");
		logo.innerHTML = '<div style="position:fixed; top:0; right:0; left:auto; z-index:10; background-color:red; color:white; font-size:10pt; font-weight:bold;">Some Posts Were Blocked</div>';
		document.body.insertBefore(logo, document.body.firstChild);
	}
}

