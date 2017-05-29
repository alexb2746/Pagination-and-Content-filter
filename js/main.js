
const studentList = $('.student-list').children();
const getName = $('.email').siblings('h3');
const paginationList = document.getElementById('paginationLinks');

for (let i = 10; i < studentList.length; i += 1) {
    $(studentList[i]).hide();
}

let count = 1;
for (let i = 10; i < studentList.length; i += 10) {
    let countAsString = String(count);
    $(paginationList).append(
        '<li><a id="page' + countAsString + '">' + countAsString + '</a></li>'
    );

    count += 1;
}

$(paginationList).on('click', 'a', function() {
    for(let i = 1; i <= $(paginationList).children().length; i += 1) {
        let idCheck = 'page' + String(i);
        if (event.target.id == idCheck) {
            $(studentList).hide();
            let start = (i * 10) - 1;
            let end = start + 10;
            for (let k = start; k < end; k += 1) {
                $(studentList[k]).show();
            }
        }
    }
});

// Search Box feature

// Function for getting the text of names
getText = (selector) => {
    return $(selector).map(function() {
        return $(this).text();
    });
}

/* This function takes in the array to search (emails or names) and returns
an array if the text is anywhere within the email or name. */
compareNames = (arr, searchText) => {
    return arr.filter((name) => {
        if (name.includes(searchText)) {
            return true;
        } else {
            return false;
        }
    });
}


// Arrays for search box
let emailNames = getText('.email');
let names = getText(getName);
emailNames = Array.from(emailNames);
names = Array.from(names);
let searchReturn = [];

//Code used to add enter key functionality see here:
//http://stackoverflow.com/questions/18160342/jquery-how-to-trigger-click-event-on-pressing-enter-key
$('#searchBox').on('keypress', function(e) {
    //Function need to prevent page refersh see here:
    //http://stackoverflow.com/questions/2215462/html-form-when-i-hit-enter-it-refreshes-page
    $(function() {
      $("#searchBox").submit(function() {
        return false; });
      });
    let code = e.keyCode || e.which;
    if (code == 13) {
      search();
    }
});


$('#searchButton').click(function() {
    search();
});

search = () => {
    $(studentList).hide();
    let searchText = $('#searchBox').val().toLowerCase();
    searchReturn = compareNames(emailNames, searchText);
    searchReturn.push(compareNames(names, searchText));
    for (let i = 0; i < studentList.length; i += 1) {
        for (let k = 0; k < searchReturn.length; k += 1) {
            if (studentList[i].innerText.includes(searchReturn[k])) {
                $(studentList[i]).show();
            }
        }
    }
    if (searchReturn == '' ) {
        $(studentList).hide();
        alert('The search returned no results.');
    }
    $('#searchBox').val("");
}
