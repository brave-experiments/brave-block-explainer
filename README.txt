usage: run.js [-h] -u URL [-l LISTS] [-s SECS] [-r RULE]

Command line tool for determining which filter lists are responsible for 
blocking requests in brave. by default evaluates the following lists: 
(EasyList, EasyPrivacy, uBlock Unbreak, uBlockOrigin Filters, uBlock filters 
– Privacy, Brave Unbreak, NoCoin Filter List, Disconnect rules, JPN: ABP 
Japanese filters (日本用フィルタ)).

Optional arguments:
  -h, --help            Show this help message and exit.
  -u URL, --url URL     The url to determine blocking behavior on.
  -l LISTS, --lists LISTS
                        The filter lists to evaluate / match against. By 
                        default uses all the filter lists Brave uses by 
                        default, along with the Japan regional filter list.
  -s SECS, --secs SECS  Number of seconds to spend on the page.
  -r RULE, --rule RULE  If provided, will also print which filter list rule 
                        blocked each url.
