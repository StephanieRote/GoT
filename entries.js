var loadJSON = function() {
    var xhr = new XMLHttpRequest();

    xhr.overrideMimeType('application/json');
    xhr.open('GET', 'entries.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == '200') {
            showEntryInfo(JSON.parse(xhr.responseText).entries);
        }
    }
    xhr.send(null);
};

loadJSON();

// Statuses
// 1 - Alive
// 2 - Dead
// 3 - Wight

var statuses = {
    1: 'Alive',
    2: 'Dead',
    3: 'White walker'
};

var answers = {
    characters: [
        {
            id: 1,
            name: 'Jon Snow',
            status: 1
        },
        {
            id: 2,
            name: 'Sansa Stark',
            status: 1
        },
        {
            id: 3,
            name: 'Arya Stark',
            status: 1
        },
        {
            id: 4,
            name: 'Bran Stark',
            status: 1
        },
        {
            id: 5,
            name: 'Cersei Lannister',
            status: 1
        },
        {
            id: 6,
            name: 'Jaime Lannister',
            status: 1
        },
        {
            id: 7,
            name: 'Tyrion Lannister',
            status: 1
        },
        {
            id: 8,
            name: 'Daenerys Targaryen',
            status: 1
        },
        {
            id: 9,
            name: 'Yara Greyjoy',
            status: 1
        },
        {
            id: 10,
            name: 'Theon Greyjoy',
            status: 2
        },
        {
            id: 11,
            name: 'Melisandre',
            status: 2
        },
        {
            id: 12,
            name: 'Jorah Mormont',
            status: 2
        },
        {
            id: 13,
            name: 'The Hound',
            status: 1
        },
        {
            id: 14,
            name: 'The Mountain',
            status: 1
        },
        {
            id: 15,
            name: 'Samwell Tarley',
            status: 1
        },
        {
            id: 16,
            name: 'Gilly',
            status: 1
        },
        {
            id: 17,
            name: 'Sam (Child)',
            status: 1
        },
        {
            id: 18,
            name: 'Lord Varys',
            status: 1
        },
        {
            id: 19,
            name: 'Brienne of Tarth',
            status: 1
        },
        {
            id: 20,
            name: 'Davos Seaworth',
            status: 1
        },
        {
            id: 21,
            name: 'Bronn',
            status: 1
        },
        {
            id: 22,
            name: 'Podrick Payne',
            status: 1
        },
        {
            id: 23,
            name: 'Tormund Giantsbane',
            status: 1
        },
        {
            id: 24,
            name: 'Qyburn',
            status: 1
        },
        {
            id: 25,
            name: 'Grey Worm',
            status: 1
        },
        {
            id: 26,
            name: 'Gendry',
            status: 1
        },
        {
            id: 27,
            name: 'Beric Dondarrion',
            status: 3
        },
        {
            id: 28,
            name: 'Euron Greyjoy',
            status: 1
        },
        {
            id: 29,
            name: 'Daario',
            status: 1
        },
        {
            id: 30,
            name: 'Dolorous Edd',
            status: 3
        },
        {
            id: 31,
            name: 'Missandei',
            status: 1
        },
        {
            id: 32,
            name: 'Ghost',
            status: 1
        },
        {
            id: 33,
            name: 'Nymeria',
            status: 1
        }
    ],
    bonuses: [
        {
            answer: null,
            id: 1,
            question: 'Is Daenerys pregnant?',
            points: 1
        },
        {
            answer: 3,
            id: 2,
            question: 'Who kills the Night King?',
            points: 2
        },
        {
            answer: null,
            id: 3,
            question: 'Who holds the Iron Throne at the end?',
            points: 4
        }
    ]
};

var showEntryInfo = function(entries) {
    var options = '';

    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var fanName = entry.fanName;
        var id = entry.id;

        options += '<option value="entry.html?id=' + id + '">' + fanName + '</option>';
    }

    var entryEl = '<select onchange="location = this.value;"><option value="entry.html?">Entries</option>' + options + '</select>';

    document.getElementById('entries').innerHTML = entryEl;

    var getParam = function(key) {
        var params = window.location.search.replace('?', '').split('&');
        var value;

        for (var p = 0; p < params.length; p++) {
            var param = params[p].split('=');
            var paramKey = param[0];
            var paramValue = param[1];

            if (paramKey === key) {
                value = paramValue;

                break;
            }
        }

        return value;
    };

    var getEntry = function(id) {
        var entry;

        for (var e = 0; e < entries.length; e++) {
            var thisEntry = entries[e];

            if (thisEntry.id === Number(id)) {
                entry = thisEntry;

                break;
            }
        }

        return entry;
    };

    var getPoints = function(id, type, answer) {
        var points = 0;
        var characters = answers.characters;
        var bonuses = answers.bonuses;

        if (type === 'character') {
            for (var s = 0; s < characters.length; s++) {
                var character = characters[s];
                var characterId = character.id;
                var characterStatus = character.status;

                if (characterId === id) {
                    if (answer === characterStatus) {
                        points += 1;

                        if (answer === 3) {
                            points += 1;
                        }
                    }
                    
                    if (answer === 3 && characterStatus !== 3) {
                        points -= 1;
                    } else if (answer === 2 && characterStatus === 3) {
                        points += 1;
                    }
                }
            }
        } else {
            for (var b = 0; b < bonuses.length; b++) {
                var bonus = bonuses[b];
                var bonusId = bonus.id;
                var bonusPoints = bonus.points;
                var bonusAnswer = bonus.answer;

                if (id === bonusId && bonusAnswer === answer) {
                    points += bonusPoints;
                }
            }
        }

        return points;
    };

    var calculateEntry = function(entry) {
        var answers = entry.answers;
        var characters = answers.characters;
        var bonuses = answers.bonuses;
        var totalPoints = 0;

        for (var c = 0; c < characters.length; c++) {
            var character = characters[c];
            var id = character.id;
            var answer = character.status;
            var characterPoints = getPoints(id, 'character', answer);

            totalPoints += characterPoints;
        }

        for (var b = 0; b < bonuses.length; b++) {
            var bonus = bonuses[b];
            var bonusId = bonus.id;
            var bonusAnswer = bonus.answer;
            var bonusPoints = getPoints(bonusId, 'bonus', bonusAnswer);

            totalPoints += bonusPoints;
        }

        return totalPoints;
    };

    var getEntryEl = function(entry) {
        let el = '<table><thead><th><tr><td>Character</td><td>Answer</td></tr></thead><tbody>';
        const { answers: { bonuses, characters }} = entry;
        const { bonuses: answerBonuses, characters: answerCharacters } = answers;

        characters.forEach(({ name, status }) => {
            el += '<tr><td>' + name + '</td><td>' + statuses[status] + '</td></tr>';
        });

        el += '</tbody></table>';

        el += '<table><thead><thead><tr><td>Bonus Questions</td><td>Answers</td></tr></thead><tbody>';

        bonuses.forEach(({ id, answer }) => {
            let actualAnswer = {};
            let question = '';
            let characterName = '';

            for (let b = 0; b < answerBonuses.length; b++) {
                const { id: thisId, question: thisQuestion } = answerBonuses[b];

                if (thisId === id) {
                    question = thisQuestion;
                }
            }

            if (typeof answer === 'boolean' || typeof answer === 'string') {
                characterName = answer;
            } else {
                for (let a = 0; a < answerCharacters.length; a++) {
                    const { id: charId, name: charName } = answerCharacters[a];

                    if (charId === answer) {
                        characterName = charName;
                    }
                }
            }

            el += '<tr><td>' + question + '</td><td>' + characterName + '</td></tr>';
        });

        el += '</tbody></table>';

        return el;
    };

    const leaders = [];

    const leaderboardEL = function() {
        let el = '<h3>Leaderboard</h3><table><thead><th><tr><td>Entry name</td><td>Points</td></tr></thead><tbody>';

        entries.forEach(entry => {
            const points = calculateEntry(entry);

            leaders.push({ id: entry.id, points, name: entry.fanName });

            leaders.sort((a, b) => {
                return b.points - a.points;
            });
        });

        leaders.forEach(leader => {
            el += '<tr><td>' + leader.name + '</td><td>' + leader.points + '</td></tr>';
        });

        el += '</tbody></table>';

        return el;
    };

    var entryId = getParam('id');

    if (entryId) {
        var entry = getEntry(entryId);
        var totalPoints = calculateEntry(entry);

        document.getElementById('points').innerHTML = 'Total Points = ' + totalPoints;
        document.getElementById('userEntry').innerHTML = getEntryEl(entry);
    }

    document.getElementById('leaderboard').innerHTML = leaderboardEL();

    window.entries = entries;
    window.answers = answers;
};
