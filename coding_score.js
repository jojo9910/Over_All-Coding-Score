
var chart = anychart.pie();

function myfunction() {
    var user_codechef = document.getElementById("user_codechef").value;
    var user_codeforces = document.getElementById("user_codeforces").value;
    var user_spoj = document.getElementById("user_spoj").value;
    var user_interviewbit = document.getElementById("user_interviewbit").value;
    var codechef = document.getElementById("codechef");
    var spoj = document.getElementById("spoj");
    var interviewbit = document.getElementById("interviewbit");
    var codeforces = document.getElementById("codeforces");
    var total_sum = document.getElementById("total_sum");
    var total_socre = document.getElementById("total_score");
    var users = [user_codechef, user_spoj, user_interviewbit, user_codeforces];
    var platefroms = ["codechef", "spoj", "interviewbit", "codeforces"];
    var user_api_url = "https://competitive-coding-api.herokuapp.com/api/";

    async function find_data() {
        var solved_codechef = 0;
        var solved_codeforces = 0;
        var solved_spoj = 0;
        var solved_interviewbit = 0;
        console.log(users.length);
        for (var i = 0; i < users.length; i++) {
            var curr_api_url = user_api_url + platefroms[i] + "/" + users[i];
            var response = await fetch(curr_api_url);
            var count_solvedproblems = await response.json();
            // console.log(count_solvedproblems);
            if (platefroms[i] == "codechef" && count_solvedproblems.status != "Failed") {
                solved_codechef = count_solvedproblems.fully_solved.count;
            }
            else if (platefroms[i] == "spoj" && count_solvedproblems.status != "Failed") {
                solved_spoj = count_solvedproblems.solved.length;
            }
            else if (platefroms[i] == "interviewbit" && count_solvedproblems.status != "Failed") {
                solved_interviewbit = count_solvedproblems.score;

            }
            else if (platefroms[i] == "codeforces" && count_solvedproblems.status != "Failed") {
                var curr_api_url1 = "https://codeforces.com/api/user.status?handle=" + users[i] + "&from=1&count=1000";
                var response = await fetch(curr_api_url1);
                var count_solvedproblems = await response.json();
                for (var j = 0; j < count_solvedproblems.result.length; j++) {
                    if (count_solvedproblems.result[j].verdict == "OK") solved_codeforces = solved_codeforces + 1;
                }
            }
        }

        codechef.textContent = solved_codechef;
        spoj.textContent = solved_spoj;
        interviewbit.textContent = solved_interviewbit;
        codeforces.textContent = solved_codeforces;
        codechef.style.color = "green";
        spoj.style.color = "green";
        codeforces.style.color = "green";
        interviewbit.style.color = "green";

        total_sum.textContent = solved_codechef + solved_codeforces + solved_spoj;
        total_socre.textContent = solved_interviewbit;
        total_socre.style.color = "green";
        total_sum.style.color = "green";

        chart.data([
            ["codechef", solved_codechef],
            ["codeforces", solved_codeforces],
            ["spoj", solved_spoj]
        ]);
        chart.title("Percentage of solved problems");
        chart.container("container");
        chart.draw();
    }
    find_data();
}