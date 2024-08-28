const fs = require('fs');

// Get JSON
const data = require('./data.json');

function generatePage() {
	let nav = "";
	let sections = "";
	let week = 1;
	for (let key of Object.keys(data)) {
		let entry = data[key];

		// Start week nav section
		nav += `
			<section class="nav-section">
				<a class="nav-week" href="#week-${week}">
					${entry['title']} <span style="color: hsl(0deg, 0%, 25%);">${entry['subtitle']}</span>
				</a>
		`;

		// Start week section
		sections += `
			<section class="week" id="week-${week}">
				<h2 class="week-title"><a href="#week-${week}">${entry['title']}</a> <span style="color: hsl(0deg, 0%, 75%);">${entry['subtitle']}</span></h2>
		`;
		for (let study of entry['studies']) {
			nav += `
				<a class="nav-study" href="#study-${study['number']}">
					<div class="nav-study-number">Study ${study['number']}</div>
					<div class="nav-study-name">${study['desc']}</span></div>
				</a>
			`;

			// Build media and links
			let media = "";
			for (let mediaItem of study['content']) {
				let links = '';
				for (let link of mediaItem['links']) {
					links += `<a href="${link["url"]}" target="_blank">${link["display-text"]}</a>`;
				}
				media += `
					<figure class="study-reference">
						<video autoplay muted loop playsinline disableremoteplayback class="study-reference-media">
							<source data-src="${mediaItem['file']}">
						</video>
						<figcaption class="study-reference-caption">
							${mediaItem['credit']}<br>
							${links}
						</figcaption>
					</figure>
				`;
			}

			// Build sections
			sections += `
				<div class="study" id="study-${study["number"]}">
					<div class="study-heading">
						<a href="#study-${study["number"]}" class="study-number">Study ${study["number"]}</a>
						<h3 class="study-title">${study["desc"]}</h3>
					</div>
					<div class="study-references">
						${media}
					</div>
				</div>
			`;
		}

		// Close week nav section
		nav += `
			</section>
		`;

		// Close week section
		sections += `
			</section>
		`;

		week++;
	}

	// Homepage portfolio grid
	let pageContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>In Motion</title>
		
			<meta name="author" content="GD with GD">
			<meta name="keywords" content="Motion Design, Animation, Design Education, Tutorial, Pedagogy">
			<meta name="description" content="Learn motion design through motion design.">
			<meta property="og:url" content="https://inmotion.gdwithgd.com/">
			<meta name="og:title" property="og:title" content="In Motion">
			<meta property="og:description" content="Learn motion design through motion design.">
			<meta property="og:image" content="/assets/meta/opengraph.jpg">
			<link rel="icon" type="png" href="/assets/meta/favicon.png">
		
			<link rel="stylesheet" href="style.css">
		</head>
		<body>
			<header class="header">
				<h1 class="header-title">In Motion</h1>
				<p class="header-desc">
					The best way to learn a new skill is by practicing it. That’s how I learned to animate. Here’s a regimen you can follow for learning how to animate, with examples to inspire you. By <a href="https://gdwithgd.com/" target="_blank">GD with GD</a>.
				</p>
			</header>
		
			<button class="nav-toggle" onclick="openNav();">Table of Contents</button>
			<nav class="nav" data-active="0">
				<button class="nav-close" onclick="closeNav();">× Close Menu</button>
				${nav}
			</nav>

			${sections}

			<script src="script.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`index.html`, pageContent, err => {
		if (err) {
			console.error(err);
		}
	});
}
generatePage();