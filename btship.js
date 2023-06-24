const user_Window = window;
const btsh_Body = document.querySelector('div.btsh-body');
let btsh_Body_Height = window.innerHeight;
user_Window.addEventListener('load', () => {
    btsh_Body_Height = window.innerHeight;
    btsh_Body.style.height = btsh_Body_Height + 'px';
}, false);
user_Window.addEventListener('resize', () => {
    btsh_Body_Height = window.innerHeight;
    btsh_Body.style.height = btsh_Body_Height + 'px';
}, false);


// Tworzenie komórek pola bitwy:
const battleField_ArenaGroup = document.querySelector('div.btsh-battleField-areaGroup');
let battleField_BlocksArena_Array = [];
for (i = 0; i < 100; i++) {
    battleField_BlocksArena_Array[i] = document.createElement('div');
    battleField_BlocksArena_Array[i].setAttribute('class', 'btsh-battleField-areaBlock');
    battleField_BlocksArena_Array[i].setAttribute('id', [i]);
    battleField_ArenaGroup.appendChild(battleField_BlocksArena_Array[i]);
};
//console.log(battleField_BlocksArena_Array[0]);
(function() {
    // Boczne pole planszy:
    const battleField_None = document.querySelector('div.btsh-battleField-none');
    battleField_None.textContent = '+';
    // Tworzenie poziomych bloków nawigacyjnych:
    const battleField_HorizontalGroup = document.querySelector('div.btsh-battleField-horizontalNumGroup');
    let battleField_BlocksHorizontal = [];
    for (i = 0; i < 10; i++) {
        battleField_BlocksHorizontal[i] = document.createElement('div');
        battleField_BlocksHorizontal[i].setAttribute('class', 'btsh-battleField-horizontalNumBlock');
        battleField_BlocksHorizontal[i].textContent = [i];
        battleField_HorizontalGroup.appendChild(battleField_BlocksHorizontal[i]);

    }
    // Tworzenie pionowych bloków nawigacyjnych:
    const battleField_VerticalGroup = document.querySelector('div.btsh-battleField-verticalNumGroup');
    let battleField_BlocksVertical = [];
    let j = 0;
    for(i = 0; i < 10; i++) {
        battleField_BlocksVertical[i] = document.createElement('div');
        battleField_BlocksVertical[i].setAttribute('class', 'btsh-battleField-verticalNumBlock');
        battleField_BlocksVertical[i].textContent = j;
        battleField_VerticalGroup.appendChild(battleField_BlocksVertical[i]);
        j += 10;
    }
}());

let audio_BackgruoudMusic_Array = [];
let audio_bcgM = document.querySelectorAll('audio.bcgM');
for (i = 0; i < audio_bcgM.length; i++) {
    audio_BackgruoudMusic_Array[i] = document.querySelectorAll('audio.bcgM')[i];
};
console.log('Soundtracks - background music: ' + audio_BackgruoudMusic_Array);
const backgroundMusic_Audio = audio_BackgruoudMusic_Array[0];
/*backgroundMusic_Audio.loop = true;
backgroundMusic_Audio.load();*/
const userWindow = window;
userWindow.addEventListener('load', () => {
        backgroundMusic_Audio.play();
        //alert('hej');
}, false);

(function() {

    // Dźwięki:
    let audio_Shots_Array = [];
    let audio_Shots = document.querySelectorAll('audio.shot');
    for (i = 0; i < audio_Shots.length; i++) {
        audio_Shots_Array[i] = document.querySelectorAll('audio.shot')[i];
    };
    //console.log('Soundtracks - shots: ' + audio_Shots_Array);

    // Teren bitwy:
    let battle_Field_Array = [];
    for (i = 0; i < 100; i++) {
        battle_Field_Array[i] = [i];     //{field_number: [i], ship_Location: false};
    }
    console.log('Teren bitwy: ' + battle_Field_Array);

    // Liczba statków:
    //let ship_Amount = Math.floor((Math.random() * 3) + 5);   // Zaczynamy od 5, do maksymalnie 8 (5 + 3). Druga liczba określa - od której liczby zaczynamy losowanie, 
                                                             // a pierwsza ile liczb idziemy w górę (od liczby drugiej). Jezeli nie ma liczbt drugiej, zaczynamy od 0.
    let ship_Amount = 7;
    console.log('Liczba statków: ' + ship_Amount);

    // Kierunke statku:
    const ship_Direction_Array = ['toBottom', 'toRight'];
    let ship_Direction = [];
    let hpg_B = 0;
    for (i = 0; i < ship_Amount; i++) {
        ship_Direction[i] = ship_Direction_Array[Math.floor(Math.random() * ship_Direction_Array.length)];   // Nie dodajemy 1, gdyż liczenie następuje od pirewszego indeksu tablicy 'ship_Direction_Array', który ma wartość '0'.
        hpg_B += 1;
        console.log('Kierunek statku statku ' + hpg_B + ': ' + ship_Direction[i]);
    };

    // Długość statku
    const ship_Max_Length = 3
    let ships_AndThem_Length = [];
    let hpg_A = 0;
    for (i = 0; i < ship_Amount; i++) {
        ships_AndThem_Length[i] = Math.floor((Math.random() * ship_Max_Length) + 1);
        hpg_A += 1;
        console.log('Długość statku ' + hpg_A + ': ' + ships_AndThem_Length[i]);
    };

    // Położenie statku i jego współrzędne:
    const battleship_Field_Length = 99;
    let ships_AndThem_Location = [];
    let hpg_C = 0;
    let ship_Coordinates_Array = [];
    let help_Coor = 0;
    for (i = 0; i < ship_Amount; i++) {
        if (ship_Direction[i] == 'toBottom' && ships_AndThem_Length[i] == 1) {
            // Położenie statku:
            ships_AndThem_Location[i] = Math.floor((Math.random() * (battle_Field_Array.length - 1)) + 1);
            hpg_C = i + 1;   // Tylko ten zapis jest poprawny (nie hpg_C += 1), gdyż wtedy do 'hpg_C' jest wkładany numer aktualnego elementu, 
            // któremu zostaje przypisana wygrenerowana losowo wartość lokalizacji, a nie tak jak w poprzednim typie zapisu - liczba kolejnego 
            // elementu, mówiąc jaśniej, kiedy wpisalibyśmy zapis 'hpg_C += 1', do poszczególnych indeksów byśmy wpisywali kolejne liczby, 
            // mówiąc jeszcze jaśniej, jak mamy 3 statki z długością '1' i kierunkiem w dół lub prawo i program napotkalby na kolejne pasujące
            // warunki, ale ten statek miałby indeks 6, to wyświetli się nie jako statek z indeksem 6, a z indeksem 4, bo zapisem 'hpg_C += 1'
            // dodajemy kolejne cyfry (), a nie jak w nawy przypisujemy liczby kolejności elementów.
            //console.log('Lokalizacja początkowa statku ' + hpg_C + ': ' + ships_AndThem_Location[i]);
            // Współrzędne całkowite statku:
            ship_Coordinates_Array[i] = [battle_Field_Array[ships_AndThem_Location[i]]];
            //battle_Field_Array.pop([ships_AndThem_Location[i]]);
            help_Coor = i + 1;
            console.log('Współrzędne statku ' + help_Coor + ': ' + ship_Coordinates_Array[i]);
            // Pojawienie się statku na polu bitwy:
            // console.log(ship_Coordinates_Array[i][0]); Wyświetlenie osobnych indeksów tablicy potomnej z tablicy nadrzędnej.
            let btsh_CurrentFieldArea_ToShip = ship_Coordinates_Array[i][0];
            battleField_BlocksArena_Array[btsh_CurrentFieldArea_ToShip].setAttribute('class', 'btsh-battleField-areaBlock-ship ship-style-1');
            //console.log('Współrzędne statku ' + i + ' do lok. elem. ID: ' + btsh_CurrentFieldArea_ToShip);
        } else if (ship_Direction[i] == 'toRight' && ships_AndThem_Length[i] == 1) {
            // Położenie statku:
            ships_AndThem_Location[i] = Math.floor((Math.random() * (battle_Field_Array.length - 1)) + 1);
            hpg_C = i + 1;
            //console.log('Lokalizacja początkowa statku ' + hpg_C + ': ' + ships_AndThem_Location[i]);
            // Współrzędne całkowite statku:
            ship_Coordinates_Array[i] = battle_Field_Array[ships_AndThem_Location[i]];
            //battle_Field_Array.pop([ships_AndThem_Location[i]]);
            help_Coor = i + 1;
            console.log('Współrzędne statku ' + help_Coor + ': ' + ship_Coordinates_Array[i]);
            // Pojawienie się statku na polu bitwy:
            let btsh_CurrentFieldArea_ToShip = ship_Coordinates_Array[i][0];
            battleField_BlocksArena_Array[btsh_CurrentFieldArea_ToShip].setAttribute('class', 'btsh-battleField-areaBlock-ship ship-style-2');
            //console.log('Współrzędne statku ' + i + ' do lok. elem. ID: ' + btsh_CurrentFieldArea_ToShip);
        }
        else if (ship_Direction[i] == 'toBottom' && ships_AndThem_Length[i] == 2) {
            // Położenie statku:
            ships_AndThem_Location[i] = Math.floor((Math.random() * (battle_Field_Array.length - 11)) + 1);
            hpg_C = i + 1;
            //console.log('Lokalizacja początkowa statku ' + hpg_C + ': ' + ships_AndThem_Location[i]);
            // Współrzędne całkowite statku:
            ship_Coordinates_Array[i] = [ships_AndThem_Location[i]];
            //battle_Field_Array.pop([ships_AndThem_Location[i]]);
            //for (j = 1; j < 2; j++) {
                ship_Coordinates_Array[i].push([ships_AndThem_Location[i] + 10]);
                //battle_Field_Array.pop([ships_AndThem_Location[i]]);
            //};
            help_Coor = i + 1;
            console.log('Współrzędne statku ' + help_Coor + ': ' + ship_Coordinates_Array[i]);
            // Pojawienie się statku na polu bitwy:
            for (k = 0; k < 2; k++) {
                if (ship_Coordinates_Array[i][k]) {   // Jeżeli wartość indeksu istnieje, wykonaj polecenia, kttóre utworzą statek.
                    // Gdyby nie było tego warunku, wówczas istnieje ryzyko wystąpienia pusteko indeksu na [k], co spowodowałoby 
                    // błąd, gdyby wartość z pętli [k] porównać z pustym indeksem.
                    let btsh_CurrentFieldArea_ToShip = ship_Coordinates_Array[i][k];
                    battleField_BlocksArena_Array[btsh_CurrentFieldArea_ToShip].setAttribute('class', 'btsh-battleField-areaBlock-ship ship-style-3');
                    //console.log('Współrzędne statku ' + i + ' do lok. elem. ID: ' + btsh_CurrentFieldArea_ToShip);
                } else {}
            };
        } else if (ship_Direction[i] == 'toRight' && ships_AndThem_Length[i] == 2) {
            // Położenie statku:
            let arenaTwoSizeLimit_Array = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8],
                [10, 11, 12, 13, 14, 15, 16, 17, 18],
                [20, 21, 22, 23, 24, 25, 26, 27, 28],
                [30, 31, 32, 33, 34, 35, 36, 37, 38],
                [40, 41, 42, 43, 44, 45, 46, 47, 48],
                [50, 51, 52, 53, 54, 55, 56, 57, 58],
                [60, 61, 62, 63, 64, 65, 66, 67, 68],
                [70, 71, 72, 73, 74, 75, 76, 77, 78],
                [80, 81, 82, 83, 84, 85, 86, 87, 88],
                [90, 91, 92, 93, 94, 95, 96, 97, 98]
            ];
            let current_arenaTwoSizeLimit_Array = arenaTwoSizeLimit_Array[Math.floor(Math.random() * arenaTwoSizeLimit_Array.length)];
            //console.log('Wybór tablicy (DR, L2): ' + current_arenaTwoSizeLimit_Array);
            ships_AndThem_Location[i] = current_arenaTwoSizeLimit_Array[Math.floor(Math.random() * current_arenaTwoSizeLimit_Array.length)];
            hpg_C = i + 1;
            //console.log('Lokalizacja początkowa statku ' + hpg_C + ' (DR, L2): ' + ships_AndThem_Location[i]);
            // Współrzędne całkowite statku:
            ship_Coordinates_Array[i] = [battle_Field_Array[ships_AndThem_Location[i]]];
            //battle_Field_Array.pop([ships_AndThem_Location[i]]);
            //for (j = 1; j < 2; j++) {
                ship_Coordinates_Array[i].push([ships_AndThem_Location[i] + 1]);
                //battle_Field_Array.pop([ships_AndThem_Location[i]]);
            //};
            help_Coor = i + 1;
            console.log('Współrzędne statku ' + help_Coor + ': ' + ship_Coordinates_Array[i]);
            // Pojawienie się statku na polu bitwy:
            for (k = 0; k < 2; k++) {
                if (ship_Coordinates_Array[i][k]) {
                    let btsh_CurrentFieldArea_ToShip = ship_Coordinates_Array[i][k];
                    battleField_BlocksArena_Array[btsh_CurrentFieldArea_ToShip].setAttribute('class', 'btsh-battleField-areaBlock-ship ship-style-4');
                    //console.log('Współrzędne statku ' + i + ' do lok. elem. ID: ' + btsh_CurrentFieldArea_ToShip);
                } else {}
            };
        }
        else if (ship_Direction[i] == 'toBottom' && ships_AndThem_Length[i] == 3) {
            // Położenie statku:
            ships_AndThem_Location[i] = Math.floor((Math.random() * (battle_Field_Array.length - 21)) + 1);
            hpg_C = i + 1;
            //console.log('Lokalizacja początkowa statku ' + hpg_C + ': ' + ships_AndThem_Location[i]);
            // Współrzędne całkowite statku:
            ship_Coordinates_Array[i] = [ships_AndThem_Location[i]];
            //battle_Field_Array.pop([ships_AndThem_Location[i]]);
            //for (j = 1; j < 3; j++) {
                ship_Coordinates_Array[i].push([ships_AndThem_Location[i] + 10]);
                //battle_Field_Array.pop([ships_AndThem_Location[i]]);
                ship_Coordinates_Array[i].push([ships_AndThem_Location[i] + 20]);
                //battle_Field_Array.pop([ships_AndThem_Location[i]]);
            //};
            help_Coor = i + 1;
            console.log('Współrzędne statku ' + help_Coor + ': ' + ship_Coordinates_Array[i]);
            // Pojawienie się statku na polu bitwy:
            for (k = 0; k < 3; k++) {
                if (ship_Coordinates_Array[i][k]) {
                    let btsh_CurrentFieldArea_ToShip = ship_Coordinates_Array[i][k];
                    battleField_BlocksArena_Array[btsh_CurrentFieldArea_ToShip].setAttribute('class', 'btsh-battleField-areaBlock-ship ship-style-5');
                    //console.log('Współrzędne statku ' + i + ' do lok. elem. ID: ' + btsh_CurrentFieldArea_ToShip);
                } else {}
            };
        } else if (ship_Direction[i] == 'toRight' && ships_AndThem_Length[i] == 3) {
            // Położenie statku:
            let arenaThreeSizeLimit_Array = [
                [0, 1, 2, 3, 4, 5, 6, 7],
                [10, 11, 12, 13, 14, 15, 16, 17],
                [20, 21, 22, 23, 24, 25, 26, 27],
                [30, 31, 32, 33, 34, 35, 36, 37],
                [40, 41, 42, 43, 44, 45, 46, 47],
                [50, 51, 52, 53, 54, 55, 56, 57],
                [60, 61, 62, 63, 64, 65, 66, 67],
                [70, 71, 72, 73, 74, 75, 76, 77],
                [80, 81, 82, 83, 84, 85, 86, 87],
                [90, 91, 92, 93, 94, 95, 96, 97]
            ];
            let current_arenaThreeSizeLimit_Array = arenaThreeSizeLimit_Array[Math.floor(Math.random() * arenaThreeSizeLimit_Array.length)];
            //console.log('Wybór tablicy (DR, L3): ' + current_arenaThreeSizeLimit_Array);
            ships_AndThem_Location[i] = current_arenaThreeSizeLimit_Array[Math.floor(Math.random() * current_arenaThreeSizeLimit_Array.length)];
            hpg_C = i + 1;
            //console.log('Lokalizacja początkowa statku ' + hpg_C + ' (DR, L3): ' + ships_AndThem_Location[i]);
            // Współrzędne całkowite statku:
            ship_Coordinates_Array[i] = [ships_AndThem_Location[i]];   // Stary zapis: [battle_Field_Array[ships_AndThem_Location[i]]]
            //battle_Field_Array.pop([ships_AndThem_Location[i]]);
            //for (j = 1; j < 3; j++) {
                ship_Coordinates_Array[i].push([ships_AndThem_Location[i] + 1]);
                //battle_Field_Array.pop([ships_AndThem_Location[i]]);
                ship_Coordinates_Array[i].push([ships_AndThem_Location[i] + 2]);
                //battle_Field_Array.pop([ships_AndThem_Location[i]]);
                //console.log('TUTAJ! ' + battle_Field_Array[ships_AndThem_Location[i]])
            //};
            help_Coor = i + 1;
            console.log('Współrzędne statku ' + help_Coor + ': ' + ship_Coordinates_Array[i]);
            // Pojawienie się statku na polu bitwy:
            for (k = 0; k < 3; k++) {
                if (ship_Coordinates_Array[i][k]) {
                    let btsh_CurrentFieldArea_ToShip = ship_Coordinates_Array[i][k];
                    battleField_BlocksArena_Array[btsh_CurrentFieldArea_ToShip].setAttribute('class', 'btsh-battleField-areaBlock-ship ship-style-6');
                    //console.log('Współrzędne statku ' + i + ' do lok. elem. ID: ' + btsh_CurrentFieldArea_ToShip);
                } else {}
            };
        }
        //console.log(ship_Direction[0] + ' | ' + ships_AndThem_Length[0]);
    };
    // console.log('Współrzędne wszystkich statków: ' + ship_Coordinates_Array);
    // Pojawianie się statków na planszy - zrób na górze z powodu nasy problemów z transportem danych poza zakres lokalny!
    // console.log('Dostępny teren bitwy po włożeniu statków: ' + battle_Field_Array);

    // Input:
    let allBadSigns = [
        'q', 'w', 'e', 'ę', 'r', 't', 'y', 'u', 'i', 'o', 'ó', 'p', 'a', 'ą', 's', 'ś', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ł', 'z', 'ż', 'ź', 'x', 'c', 'ć', 'v', 'b', 'n', 'ń', 'm', 
        "A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "R", "S", "Ś", "T", "U", "W", "X", "Y", "Z", "Ż", "Ź", "Q", "V", 
        '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ':', ';', '"', "'", '\\', '|', '/', '?', '.', ",", '<', '>'
    ];
    // Trafianie statków:
    let inputBox = document.querySelector('input.btsh-footer-textInput');
    const fireButton = document.querySelector('div.btsh-footer-buttonInput');
    inputBox.addEventListener('click', () => {
        inputBox.value = '';
    }, false);
    // Nie działa...
    /*inputBox.addEventListener('keydown', (e) => {
        key = e.key;
        for (i = 0; i < allBadSigns.length; i++) {
            if (inputBox.value == allBadSigns[i] || key == allBadSigns[i]) {
                inputBox.value = '';
            } else  {}
        };
        console.log(inputBox.value == allBadSigns[0]);
    }, false);*/
    fireButton.addEventListener('click', () => {
        // Z dźwiękami jest niezanny i trudny problem do rozwiązania. Nie wiadomo dalczego pojawia się błąd. Przez to można zapisać tylko jedno odwołanie do tablu=icy z dźwiękami, drugie nie działa.
        let randomShot = Math.ceil(Math.random() * audio_Shots_Array.length);
        audio_Shots_Array[randomShot].play();
        //console.log(audio_Shots_Array[randomShot]);
        for (i = 0; i < 100; i++) {   // DZIAŁA!
            if (inputBox.value == ship_Coordinates_Array[i] || inputBox.value == ship_Coordinates_Array[i][0] || inputBox.value == ship_Coordinates_Array[i][1] || inputBox.value == ship_Coordinates_Array[i][2]) {
                setTimeout(() => {
                    battleField_BlocksArena_Array[inputBox.value].setAttribute('class', 'btsh-battleField-areaBlock-ship');
                    console.log('TRAFIONY!');
                }, 500);
                return;
            } else {
                //console.log('PUDŁO!');
            }
        };
        //console.log('Wartość inputa: ' + inputBox.value);
    }, false);
}());