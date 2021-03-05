var fia = "USD";
var ethPrice=0
var currency=(typeof default_currency==='undefined')?'USD':default_currency

$("#buybutton").hide();

function countdownsec(s) {
    	return new Date(s * 1e3).toISOString().slice(-10, -5);
	}

function CopyToClipboard(containerid) {
          if (document.selection) {
              var range = document.body.createTextRange();
              range.moveToElementText(document.getElementById(containerid));
              range.select().createTextRange();
              document.execCommand("copy");
      
          } else if (window.getSelection) {
              var range = document.createRange();
              range.selectNode(document.getElementById(containerid));
              window.getSelection().addRange(range);
              document.execCommand("copy");
              
          }
      }

$.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=' + currency, function (result) {           
        	  for (var key in result.ethereum) {
        		  var eth = result.ethereum[key]
        	  }
            ethPrice = parseFloat(eth + currency.toLowerCase())
});
	
	$(document).ready(function(){
	
		if(document.getElementById('inputAddress')){
			$("#trackButton").show();
			var cookie = Cookies.get('addr');
			if(cookie && document.getElementById('inputRemember'))
			{
				document.getElementById('inputRemember').checked=true;
				document.getElementById('inputAddress').value=cookie;
			}
			
			startWeb3();
			
			$("#trackButton").click(function(){
				refreshData();
			});
			$("#ethToSpend").on('input',function(){
				updatePrice();
			});
		}
	});
	
	var notice = '<div class="mt-3"><div class="alert alert-warning text-primary small">This is only a front-end, to help you interact with the IND contract.</div></div>';
	var web3;
	var isMetaMask = false;
	var balance = 0;
	var aBal = 0;
	var mBal = 0;
	var dBal = 0;
	var tBalETC = 0
	var dividens = 0;
	var buyP = 0;
	var sellP = 0;
	var ethB = 0;
	var supplyB = 0;
	var addr=null;
	var tokenContract=null;
	var contractAddr = '0x167cB3F2446F829eb327344b66E271D1a7eFeC9A';
	var refacc = '0x6B4663A3966d08Af961C64486010febBb1358925';
	var abi =[{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"dividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ethereumToSpend","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tokensToSell","type":"uint256"}],"name":"calculateEthereumReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"onlyAmbassadors","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"administrators","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sellPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakingRequirement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_includeReferralBonus","type":"bool"}],"name":"myDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthereumBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"setStakingRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_identifier","type":"bytes32"},{"name":"_status","type":"bool"}],"name":"setAdministrator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"myTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disableInitialStage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_toAddress","type":"address"},{"name":"_amountOfTokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_symbol","type":"string"}],"name":"setSymbol","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_referredBy","type":"address"}],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"reinvest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"incomingEthereum","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"},{"indexed":true,"name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"tokensBurned","type":"uint256"},{"indexed":false,"name":"ethereumEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumReinvested","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"}],"name":"onReinvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethereumWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"}];

	
	function startWeb3()
	{
		if (typeof web3 !== 'undefined') {
			isMetaMask = web3.currentProvider.isMetaMask;
		}
		if(!isMetaMask){
			web3 = require('web3');
			web3 = new web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/579b4eddc6e444c7a17bd45aa4f32aea'));
		}
		else
		{
			web3.currentProvider.enable();
			$("#buybutton").show();
      //window.location.replace("https://0x167.github.io/ui/?ref=0x6b4663a3966d08af961c64486010febbb1358925");
		}
		tokenContract = web3.eth.contract(abi).at(contractAddr);
		refreshData();
	}
	
	function refreshData(justWait = true){
		let lastTime =	parseInt(localStorage.getItem("lastquery"))+11;
		if(justWait && lastTime > Date.now()/1000){
			document.getElementById('addressFeedback').innerHTML = 'Please wait ' + countdownsec(lastTime - Date.now()/1000) + ' before you make another request!<br><br>' ;
			return;
		}
		
		if(isMetaMask) {
			addr = web3.eth.accounts[0];
			if(addr!=undefined){
				document.getElementById('inputAddress').value = addr;
				document.getElementById('addressFeedback').innerText = '';
			}
			else
			{
				document.getElementById('inputAddress').value = "MetaMask Detected!";
				document.getElementById('addressFeedback').innerText = 'Please login on MetaMask or wait that MetaMask loads your wallet!';
			}
		}
		else{
			addr = document.getElementById('inputAddress').value;
		}

    //referal link
    var element = "<a href='https://0x167.github.io/ui/?ref=" + addr + "'>https://0x167.github.io/ui/?ref=" + addr + "</a>";
    $("#quoteDisplay2").html(element);
    $("#eth-address").html(addr);

    

    //Init all to zero
		$('#dBalance').html("0 ETH");
		$('#tBalance').html("0 IND");
		$('#tBalanceEth').html("0 ETH");
		$('#mBalance').html("0 ETH");
		$('.poh-nonrefdiv').html("0 ETH");
		$('#sellP').html("0 ETH")
		$('#buyP').html("0 ETH")
		$('#ethBalance').html("0 ETH");
		$('#tSupply').html("0 IND");

		if(isMetaMask){
			$("#btReinvest").hide();
			$("#btWithdraw").hide();
		}
		sellPrice();
		setTimeout(refreshData, 300000); //5m
		localStorage.setItem("lastquery", Date.now()/1000);
	}
	
	function trackTokens(){		
		if(web3.isAddress(addr) && !isMetaMask)
		{
			document.getElementById('addressFeedback').innerText = '';
			if(document.getElementById('inputRemember').checked){
				Cookies.set('addr', addr, { expires: 120 });
			}
			else
			{
				Cookies.remove('addr');
			}
			web3.eth.defaultAccount = addr;
			dividendsOf();
			balanceOf();
		}
		else if(isMetaMask){
			dividendsOf();
			balanceOf();
		}
		else if(addr!="")
		{
			document.getElementById('addressFeedback').innerText = 'Please enter valid ETH Address.';
		}
	}
	var normal_dividens = 0;
	var master_dividens = 0;


  function convertWeiToEth (e) {
  return e / 1e18
}
	
	function dividendsOf(){
		tokenContract.dividendsOf(web3.eth.defaultAccount, function(error, result){
		    if(!error){
		        var tokens = web3.toDecimal(result).toString();
		        normal_dividens = tokens;
		        dBal = Number(web3.fromWei(tokens, 'ether')).toFixed(6);
				$('.poh-nonrefdiv').html(dBal + " ETH");
         

      //
      web3.eth.getBalance(web3.eth.defaultAccount, function (error, result) {
      // We only want to show six DP in a wallet, consistent with MetaMask
      $('.address-balance').text(convertWeiToEth(result).toFixed(6) + ' ETH')
    })




				myDividends();
			}
		    else{
		        $('.poh-nonrefdiv').html(error);
		    }
		});
	}
	
	function balanceOf(){
		tokenContract.balanceOf(addr, function(error, result){
		    if(!error){
		        var tokens = web3.toDecimal(result).toString();
		        var indBal = web3.fromWei(tokens, 'ether');
		        $('.poh-balance').html( Number(indBal).toFixed(5));
             $('.poh-value').html( Number(sellP*indBal).toFixed(6)+ " ETH");
             var totalvalueineth = sellP*indBal;
             $('.poh-value-usd').html(Number((totalvalueineth*ethPrice)).toFixed(2)+ " "+fia);
		        calculateEthereumReceived(web3.toWei(indBal, 'ether'));
           

           
			}
		    else{
		        $('#tBalance').html(error);
		    }
		});
	}

	function myDividends(){
		tokenContract.myDividends(true, function(error, result){
		    if(!error){
		        var tokens = web3.toDecimal(result).toString();
		        master_dividens =  tokens - normal_dividens;
		        var allDivs = web3.fromWei(tokens, 'ether');
				if(allDivs < 0.0001) {
					$("#btReinvest").hide();
					$("#btWithdraw").hide();
		        }
		        else if(isMetaMask){
					calculateTokensReceived(web3.toWei(allDivs, 'ether'));
			    }
		        aBal = Number(allDivs).toFixed(6);
		        mBal = Number(web3.fromWei(master_dividens, 'ether')).toFixed(6);
				$('.poh-refdiv').html(mBal + " ETH");
				$('.poh-div').html(aBal + " ETH");
        $('.poh-div-usd').html(Number((ethPrice*aBal)).toFixed(2) + " "+fia);
				updateFIA2();
			}
		    else{
		        $('.poh-refdiv').html(error);
		        $('.poh-div').html(error);
		    }
		});	
	}

	function calculateTokensReceived(eth){
		tokenContract.calculateTokensReceived(eth, function(error, result){
		    if(!error){
		        var tokens_received = web3.toDecimal(result).toString();
		       


			}
		    else{
		        console.log(error);
		    }
		});
	}
	function calculateEthereumReceived(tokens){
		tokenContract.calculateEthereumReceived(tokens, function(error, result){
		    if(!error){
		        var tokens_received = web3.toDecimal(result).toString();
		        tBalETC = Number(web3.fromWei(tokens_received, 'ether')).toFixed(2);
		        $('#tBalanceEth').html("≈ " + tBalETC + " ETH");
			}
		    else{
		        console.log(error);
		    }
		});

	}
	
	function sellPrice(){
		tokenContract.sellPrice(function(error, result){
		    if(!error){
			    var tokens = web3.toDecimal(result).toString();
				sellP = web3.fromWei(tokens, 'ether');
        $('.poh-sell').html(Number(sellP).toFixed(6) + " ETH");
        $('.poh-sell-usd').html(Number((ethPrice*sellP)).toFixed(2) + " "+fia);
				trackTokens();
				buyPrice();
			}
		    else{
			    $('#sellP').html(error);
		    }
		});
	}
	function buyPrice(){
		tokenContract.buyPrice(function(error, result){
		    if(!error){
			    var tokens = web3.toDecimal(result).toString();
				buyP = web3.fromWei(tokens, 'ether');
        $('.poh-buy').html(Number(buyP).toFixed(6) + " ETH");
        $('.poh-buy-usd').html(Number((ethPrice*buyP)).toFixed(2) + " "+fia);
				totalEthereumBalance();
			}
		    else{
   			    $('.poh-buy').html(error);
		    }
		});
	}
	function totalEthereumBalance(){
		tokenContract.totalEthereumBalance(function(error, result){
		    if(!error){
			    var tokens = web3.toDecimal(result).toString();
				ethB = web3.fromWei(tokens, 'ether');
        $('.contract-balance').html(Number(ethB).toFixed(2) + " ETH");
        $('.contract-balance-usd').html(Number((ethPrice*ethB)).toFixed(2) + " "+fia);
				totalSupply();
			}
		    else{
			    $('.contract-balance').html(error);
		    }
		});
	}
	function totalSupply(){
		tokenContract.totalSupply(function(error, result){
		    if(!error){
			    var tokens = web3.toDecimal(result).toString();
				supplyB = web3.fromWei(tokens, 'ether');
        $('.contract-tokens').html(Number(supplyB).toFixed(3));
				if(document.getElementById('inputAddress').value.length<40){
					document.getElementById('addressFeedback').innerHTML="";
				}
			}
		    else{
			    $('.contract-tokens').html(error);
		    }
		});
	}


	
	function updatePrice(){
		document.getElementById('addressFeedback2').innerHTML="";
		let ethVal =  document.getElementById("ethToSpend").value;
		if(isNaN(ethVal)){
			document.getElementById('addressFeedback2').innerHTML = "Please Insert a numerical value!";
		}
		else{
			tokenContract.calculateTokensReceived(web3.toWei(ethVal,'ether'), function(error, result){
			    if(!error){
				    document.getElementById('tokenQuotation').innerHTML = " ≈ "+Number(web3.fromWei(result, 'ether')).toFixed(2)+" IND"
				}
			    else{
			        console.log(error);
			    }
		    });
		}
	}
		function changeFIA2(obj){
		fia = obj.options[obj.selectedIndex].value;
		updateFIA2();
	}

	function updateFIA2(){
		$.getJSON('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=' + fia, function(result){
      for (var key in result.ethereum) {
        		  var eth = result.ethereum[key]
        		  
      }
      ethPrice = parseFloat(eth + currency.toLowerCase())
			let fiaPrice = ethPrice;
			$('#balanceFIA').html("( " + Number(ethB*fiaPrice).toFixed(2) + " " +  fia + " )");
			$('#buyFIA').html("( " + Number(buyP*fiaPrice).toFixed(6) + " "  + fia + " )");
			$('#sellFIA').html("( " + Number(sellP*fiaPrice).toFixed(6) + " " + fia + " )");
			$('#tBalanceFIA').html("( " + Number(tBalETC*fiaPrice).toFixed(2) + " " + fia + " )");
			$('#aBalanceFIA').html("( " + Number(aBal*fiaPrice).toFixed(2) + " " + fia + " )");
			$('#mBalanceFIA').html("( " + Number(mBal*fiaPrice).toFixed(2) + " " + fia + " )");
			$('#dBalanceFIA').html("( " + Number(dBal*fiaPrice).toFixed(2) + " " + fia + " )");
		});
	}
