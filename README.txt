usage: run.js [-h] -u URL [-l LISTS] [-s SECS] [-r] [-a] [-j] [-c CACHE]

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
  -r, --rule            If provided, will also print which filter list rule
                        blocked each url (automatically done for JSON output).
  -a, --allowed         If provided, will also print which requests were
                        allowed / not blocked.
  -j, --json            Output results as JSON, instead of a console report.
  -c CACHE, --cache CACHE
                        If provided, should be a directory to read and write
                        cached versions of filter lists.
