const bidFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the bid form
    const price = document.querySelector('#userBid').value.trim();
    const bidId = event.target.getAttribute('bid-id');
    const startingBid = document.querySelector('#startingBid').textContent;
    const startingBidNum = parseInt(startingBid);

    //check if user's bid is higher than starting bid
    if (price<startingBidNum) {
        alert('Bids must be higher than the starting Bid. Please try again.');
        document.location.replace(`/bid/${bidId}`);
    } else {
        if (price) {
            //GET request to retrieve all comments
            const result = await fetch('/api/comments', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              });
            const comments = await result.json();
              //console.log(comments);

            //filter out comments applicable to the current bid
            const thisComments = comments.filter(comment => {
                return comment.bid_id == bidId;
            });

            //check if current bid is higher than other bids
            let check = false;
            thisComments.forEach(comment => {
                if(comment.price>price) {
                    check=true;
                }
            });
            if (check) {
                alert("Bids must be higher than all other bids. Please try again.");
                document.location.replace(`/bid/${bidId}`);
            } else {
                const bid_id = bidId;
                // Send a POST request to the API endpoint
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    body: JSON.stringify({ price, bid_id }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                 // If successful, redirect the browser
                    document.location.replace(`/bid/${bidId}`);
                    alert(`Bid added.`);
                } else {
                    alert(`Bid not added.`);
                }
            }
        }
    }
  
    
};
  
  
if (document.querySelector('.submitBtn') != null) {
    document.querySelector('.submitBtn').addEventListener('click', bidFormHandler);
}
  
  