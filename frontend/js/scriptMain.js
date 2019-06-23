
// call to the url where json is stored
fetch('http:localhost:8081/getJson').then(function (response) {
    return response.json();
}).then(function (battle) {
    let final = {};
    final['defender_size'] = defenderSize(battle);
    final['battleType'] = battleType(battle);
    final['attacker_outcome'] = attackerOutcome(battle);
    final['most_active'] = mostActive(battle);
    printFinal(final);
}).catch(function (e) {
    console.log(e);
});

// returns the min max and avg as object 
var defenderSize = (b) => {
    let total = 0, max = 0, avg, size = {};
    let min = b[0]['defender_size'];
    b.forEach((e) => {
        total += e['defender_size'];
        if (e['defender_size'] != null) {
            if (e['defender_size'] > max) max = e['defender_size'];
            else if (e['defender_size'] < min)
                min = e['defender_size'];
        }
    });
    avg = total / (b.length);
    size = { 'min': min, 'max': max, 'avg': avg };
    return size;
}

// returns the array of battleType 
var battleType = (b) => {
    let bType = [];
    b.forEach((e) => {
        bType.push(e['battle_type']);
    });
    return bType;
}

// returns the attacker outcome total win/loss ;
var attackerOutcome = (b) => {
    let i = 0;
    let a_out = { 'win': 0, 'loss': 0 };
    let a = b.map(o => o.attacker_king);   // array for storing all attacker_king

    b.forEach((e) => {
        if (a.includes(e['attacker_king'])) {
            ++i;
            if (e['attacker_outcome'] == 'win')
                ++a_out['win'];
            else if (e['attacker_outcome'] == 'win')
                ++a_out['loss'];
        }
    });
    return a_out;
}

var mostActive = (b) => {
    let m_a = { 'region': {}, 'attacker': {}, 'defender': {} };
    let m_A = {};
    let i = 0, j = 0, k = 0;
    let r = b.map(o => o.region);          // array for storing all regions
    let a = b.map(o => o.attacker_king);   // array for storing all attacker_king
    let d = b.map(o => o.defender_king);   // array for storing all defender_king

    b.forEach((e) => {
        if (r.includes(e['region'])) {
            ++i;
            m_a['region'][e['region']] = i;
        }
        if (a.includes(e['attacker_king'])) {
            ++j;
            m_a['attacker'][e['attacker_king']] = j;
        }
        if (d.includes(e['defender_king'])) {
            ++k;
            m_a['defender'][e['defender_king']] = k;
        }
    });

    for (let k1 in m_a) {
        let key, m = 0;
        for (let k2 in m_a[k1]) {
            if (m_a[k1][k2] > m) {
                key = k2;
                m = m_a[k1][k2];
            }
        }
        m_A[k1] = key;
    }
    return m_A;
}

var printFinal = (final) => {
    console.log(typeof (final));
    for (key in final) {
        let li = document.createElement('li');
        li.innerHTML = JSON.stringify(final[key]);
        document.getElementById('fin').appendChild(li);
    }
}
