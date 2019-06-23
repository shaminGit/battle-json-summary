
// fetch the Json from the server..

fetch('http:localhost:8081/getJson').then(function (response) {
    return response.json();
}).then(function (battle) {

    let min = 0, max = 0, total = 0, countA = 0, countD = 0, countR = 0, i = 0, k = 0, j = 0, battleType = [];
    let final = { 'most_active': {}, 'battle_type': [], 'defender_size': {}, 'attacker_outcome': {} };
    let most_active = { 'region': {}, 'attacker': {}, 'defender': {}, 'attacker_outcome': { 'win': 0, 'loss': 0 } };

    let region = battle.map(o => o.region);          // array for storing all regions
    let attacker = battle.map(o => o.attacker_king);   // array for storing all attacker_king
    let defender = battle.map(o => o.defender_king);   // array for storing all defender_king

    min = battle[0]['defender_size'];

    battle.forEach((e) => {
        battleType.push(e['battle_type']);
        total += e['defender_size'];
        if (e['defender_size'] != null) {
            if (e['defender_size'] > max) max = e['defender_size'];
            else if (e['defender_size'] < min)
                min = e['defender_size'];
        }
        if (region.includes(e['region'])) {
            ++i;
            most_active['region'][e['region']] = i;
        }
        if (attacker.includes(e['attacker_king'])) {
            ++j;
            if (e['attacker_outcome'] == 'win')
                ++most_active['attacker_outcome']['win'];
            else if (e['attacker_outcome'] == 'win')
                ++most_active['attacker_outcome']['loss'];
            most_active['attacker'][e['attacker_king']] = j;
        }
        if (defender.includes(e['defender_king'])) {
            ++k;
            most_active['defender'][e['defender_king']] = k;
        }

    });
    console.log(most_active);
    for (let k1 in most_active) {
        let key, most = 0;
        for (let k2 in most_active[k1]) {
            if (most_active[k1][k2] > most) {
                key = k2;
                most = most_active[k1][k2];
            }
        }
        final['most_active'][k1] = key;
    }

    let avg = total / (battle.length);
    final['defender_size'] = { 'min': min, 'max': max, 'avg': avg };
    final['battle_type'] = battleType;
    final['attacker_outcome'] = most_active['attacker_outcome'];
    delete final['most_active']['attacker_outcome'];
    console.log(final);
}).catch(function (e) {
    console.log(e);
})



