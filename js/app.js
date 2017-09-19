//Vue code here

const CRYPTOCOMPARE_API_URI = "https://www.cryptocompare.com";
const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

const UPDATE_INTERVAL = 60 * 1000;

setInterval(function() {
	app.getCoins();
}, UPDATE_INTERVAL);

var app = new Vue({
	el: "#app",

	data: {
		
		coins: [],
		coinData: {}

	},

	methods: {

		getCoinData: function(){

			var app = this;

			axios.get('https://www.cryptocompare.com/api/data/coinlist/')
				.then(function(res) {
					app.coinData = res.data.Data;
					app.getCoins();
				}).catch(function(err) {
					app.getCoins();
					console.error(err);
				});

		},

		getCoins: function() {

			var app = this;

			axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=10')
				.then(function(res) {
					app.coins = res.data;
				}).catch(function(err) {
					console.error(err);	
				});

		},

		getColor: (num) => {
		  return num > 0 ? "color:green;" : "color:red;";
		}

	}, //end of methods

	created: function() {
		this.getCoinData();
	}

}); //end of vue instance