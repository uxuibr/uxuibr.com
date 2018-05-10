(function() {

const els = {
	countmembers: document.getElementById('js-count-members'),
	buttons2filter: document.querySelectorAll('.members-navigation button'),
	memberlist: document.getElementById('js-member-list')
}

let init = () => {
	console.log('lol');

};
init();

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

Prismic.api("//uxuibr.prismic.io/api").then(function(api) {
	api.query(Prismic.Predicates.at('document.type', 'member'), {pageSize : 100, orderings : '[my.member.name]'}).then((data) => {
		let members = [];
		els.countmembers.innerHTML = data.total_results_size;
		// console.log(data.results);
		Shuffle(data.results);
		data.results.map((i) => {
			const _social = i.data['member.social'].value[0];
			let _facebook, _linkedin, _dribble, _behance, _instagram;
			if(_social.facebook) {_facebook = _social.facebook.value.url;}
			if(_social.linkedin) {_linkedin = _social.linkedin.value.url;}
			if(_social.dribble) {_dribble = _social.dribble.value.url;}
			if(_social.behance) {_behance = _social.behance.value.url;}
			if(_social.instagram) {_instagram = _social.instagram.value.url;}
			const member = {
				name: i.data['member.name'].value[0].text,
				jobtitle: i.data['member.jobtitle'].value[0].text,
				photo: i.data['member.photo'].value.main.url,
				address: i.data['member.address'].value[0].text,
				company: i.data['member.company'].value[0].text,
				type: i.data['member.type'].value,
				social: {
					facebook: _facebook,
					linkedin: _linkedin,
					behance: _behance,
					dribbble: _dribble,
					instagram: _instagram
				}
			}
			// console.log(member);
			
			members.push(member);
			els.memberlist.innerHTML += memberMarkup(member);

			
		});
		document.getElementById('js-member-filter-designers').addEventListener('click', (e) => {
			e.preventDefault();
			els.memberlist.innerHTML = '';
			members.filter(isDesignerMember).map((designer) => {
				els.memberlist.innerHTML += memberMarkup(designer);
			});
		});
		document.getElementById('js-member-filter-devs').addEventListener('click', (e) => {
			e.preventDefault();
			els.memberlist.innerHTML = '';
			members.filter(isDevMember).map((developer) => {
				els.memberlist.innerHTML += memberMarkup(developer);
			});
		});
		document.getElementById('js-member-filter-all').addEventListener('click', (e) => {
			e.preventDefault();
			els.memberlist.innerHTML = '';
			members.map((member) => {
				els.memberlist.innerHTML += memberMarkup(member);
			});
		});
	});
});
		

for(let i=0;i<els.buttons2filter.length;i++) {
	const it = els.buttons2filter[i]; 
	it.addEventListener('click', (e) => {
		e.preventDefault();
		if(it.classList.contains('actived')===false) {
			document.querySelector('.members-navigation button.actived').classList.remove('actived');
			it.classList.add('actived');
		}
	}, false);
}

let memberMarkup = (member) => {
	var html = '';
	html += '<li class="column column-25"><div class="member-item card">';
	if(member.photo) {
		html += '<figure><img src="'+member.photo+'"></figure>';
	}
	html += 	'<article>';
	if(member.name) {
		html += 	'<h3 class="member-name">'+member.name+'</h3>';
	}
	if(member.jobtitle) {
		html += 	'<p class="member-jobtitle">'+member.jobtitle+'</p>';
	}
	html += 		'<div class="ifhover">';
	html += 			'<ul class="social-icons">';
	if(member.social.facebook) {
		html += 			'<li class="social-item"><a class="facebook" href="'+member.social.facebook+'" target="_blank">facebook</a></li>';
	}
	if(member.social.instagram) {
		html += 			'<li class="social-item"><a class="instagram" href="'+member.social.instagram+'" target="_blank">instagram</a></li>';
	}
	if(member.social.linkedin) {
		html += 			'<li class="social-item"><a class="linkedin" href="'+member.social.linkedin+'" target="_blank">linkedin</a></li>';
	}
	if(member.social.behance) {
		html += 			'<li class="social-item"><a class="behance" href="'+member.social.behance+'" target="_blank">behance</a></li>';
	}
	if(member.social.dribbble) {
		html += 			'<li class="social-item"><a class="dribbble" href="'+member.social.dribbble+'" target="_blank">dribbble</a></li>';
	}
	html += 			'</ul>';
	if(member.address) {
	html += 			'<p class="member-address">'+member.address+'</p>';
	}
	if(member.company) {
	html += 			'<p class="member-company">'+member.company+'</p>';
	}
	html += 		'</div>';
	html += 	'</article>';
	html += '</div></li>';
	
	return html;
};

let isDevMember = (member) => {
	if(member.type === 'dev') {
		return member;
	}
};
let isDesignerMember = (member) => {
	if(member.type === 'designer') {
		return member;
	}
};
})();
(function(){
  var parallax = document.querySelectorAll(".parallax"),
      speed = 0.5;
  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){
      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
    el.style.transform = 'translateY('+(((windowYOffset*speed)/6)+48)+'%) skewY(-7deg)';
	});
  };
})();