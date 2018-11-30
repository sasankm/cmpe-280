const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');
const axios = require('axios');
const mysql = require('mysql');
const csv = require('fast-csv');

// const url = "https://ndb.nal.usda.gov/ndb/search/";
// const pageLimit = 10
// let pageCounter = 0

writeStream.write(`DB,ID,Food Description,Manufacturer \n`);

let stream = fs.createReadStream("post.csv");

let myArray = [];
let csvStream = csv.parse().on("data", (data) =>{
	myArray.push(data);
}).on("end", () => {
	myArray.shift();
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'scrape'
	});
	connection.connect((error) => {
		if(error){
			console.error(error);
		} else {
			let query = 'INSERT INTO table (DB, ID, Food, Description, Manufacturer) VALUES (?, ?, ?, ?, ?);';
			con.query(query, [myArray], (error, response) => {
				console.log(error || response);
			});
		}
	});
});
stream.pipe(csvStream);


request('https://ndb.nal.usda.gov/ndb/search/list', (error, response, html) => {
	if(!error && response.statusCode == 200){
		const $ = cheerio.load(html);
		

		$('tr').each((i,el) => {
			const $tds = $(el).find('td');
			const db = $tds.eq(0).text().replace(/\s\s+/g, '');
			const id = $tds.eq(1).text().replace(/\s\s+/g, '');
			const desc = $tds.eq(2).text().replace(/\s\s+/g, '').replace(/,/g,"");
			const man = $tds.eq(3).text().replace(/\s\s+/g, '').replace(/,/g,"");

			writeStream.write(`${db}, ${id}, ${desc}, ${man} \n`);
			
		});
		console.log("scrappind done....")
	}
});

// const getWebsiteContent = async(url ) => {
// 	try {
// 		const response = await axios.get(url);
// 		const $ = cheerio.load(response.data);

// 		$('tr').each((i,el) => {
// 			const $tds = $(el).find('td');
// 			const db = $tds.eq(0).text().replace(/\s\s+/g, '');
// 			const id = $tds.eq(1).text().replace(/\s\s+/g, '');
// 			const desc = $tds.eq(2).text().replace(/\s\s+/g, '').replace(/,/g,"");
// 			const man = $tds.eq(3).text().replace(/\s\s+/g, '').replace(/,/g,"");

// 			writeStream.write(`${db}, ${id}, ${desc}, ${man} \n`);
			
// 		});

// 		const nextPageLink = $('.paginateButtons').find('.nextLink').parent().next().find('a').attr('href');
// 		console.log(nextPageLink);
// 		pageCounter++;

// 		if(pageCounter == pageLimit){
// 			return false;
// 		}
// 		getWebsiteContent(nextPageLink);
// 	} catch(error){
// 		console.error(error);
// 	}
// }

// getWebsiteContent(url);


































