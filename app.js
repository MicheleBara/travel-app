// ============================================
// VARIABILI DI STATO
// ============================================

let viaggioSelezionatoId = null;
let viaggioInModifica = null;
let trasportoInModifica = null;
let alloggioInModifica = null;
let interesseInModifica = null;
let notaInModifica = null;
let viaggioInEliminazione = null;

let allegatiTemp = {
    trasporto: null,
    alloggio: null
};

let mappaIstanza = null;

// ============================================
// SISTEMA TRADUZIONI
// ============================================

const traduzioni = {
    it: {
        app_titolo: '✈️ I Miei Viaggi',
        nav_viaggi: '🌍 I Miei Viaggi',
        nav_inserimento: '➕ Inserisci Dati',
        nav_impostazioni: '⚙️ Impostazioni',
        sidebar_titolo: '📋 I tuoi viaggi',
        sidebar_vuoto: 'Nessun viaggio ancora.<br>Vai su <strong>Inserisci Dati</strong> per aggiungerne uno.',
        seleziona_viaggio: '✈️ Seleziona un viaggio...',
        benvenuto_titolo: 'Benvenuto!',
        benvenuto_testo: 'Seleziona un viaggio dalla lista a sinistra<br>oppure creane uno nuovo nella sezione<br><strong>Inserisci Dati</strong>.',
        scheda_trasporti: '🚂 Trasporti',
        scheda_alloggi: '🏨 Alloggi',
        scheda_interessi: '📍 Interessi',
        scheda_note: '📝 Note',
        scheda_mappa: '🗺️ Mappa',
        scheda_spese: '💰 Spese',
        ins_viaggi: '🌍 Viaggi',
        ins_trasporti: '🚂 Trasporti',
        ins_alloggi: '🏨 Alloggi',
        ins_interessi: '📍 Interessi',
        ins_note: '📝 Note',
        form_viaggi_titolo: '🌍 Aggiungi un Viaggio',
        label_destinazione: 'Destinazione',
        placeholder_destinazione: 'Es. Parigi, Tokyo...',
        label_data_partenza: 'Data di partenza',
        label_data_ritorno: 'Data di ritorno',
        label_note_rapide: 'Note rapide',
        placeholder_note_rapide: 'Es. Viaggio di lavoro, vacanza...',
        btn_aggiungi_viaggio: '+ Aggiungi Viaggio',
        form_trasporti_titolo: '🚂 Aggiungi un Trasporto',
        label_viaggio_rif: 'Viaggio di riferimento',
        seleziona_viaggio_opt: '-- Seleziona un viaggio --',
        label_mezzo: 'Mezzo di trasporto',
        mezzo_aereo: '✈️ Aereo',
        mezzo_treno: '🚂 Treno',
        mezzo_auto: '🚗 Auto',
        mezzo_autobus: '🚌 Autobus',
        mezzo_nave: '🚢 Nave',
        mezzo_altro: '🔹 Altro',
        label_partenza_da: 'Partenza da',
        placeholder_partenza_da: 'Es. Milano Centrale...',
        label_arrivo_a: 'Arrivo a',
        placeholder_arrivo_a: 'Es. Parigi CDG...',
        label_data_ora_partenza: 'Data e ora di partenza',
        label_data_ora_arrivo: 'Data e ora di arrivo',
        label_riferimento: 'Numero prenotazione / volo / treno',
        placeholder_riferimento: 'Es. FR1234...',
        label_prezzo: 'Prezzo (€)',
        placeholder_prezzo: 'Es. 120.50',
        label_allegato_trasporto: "Allegato (PDF carta d'imbarco, prenotazione...)",
        btn_seleziona_file: '📎 Seleziona file',
        btn_aggiungi_trasporto: '+ Aggiungi Trasporto',
        form_alloggi_titolo: '🏨 Aggiungi un Alloggio',
        label_nome_struttura: 'Nome della struttura',
        placeholder_nome_struttura: 'Es. Hotel Bellavista...',
        label_tipo_alloggio: 'Tipo di alloggio',
        tipo_hotel: '🏨 Hotel',
        tipo_bnb: '🏡 B&B',
        tipo_airbnb: '🛋️ Airbnb',
        tipo_ostello: '🛏️ Ostello',
        tipo_appartamento: '🏠 Appartamento',
        tipo_altro_alloggio: '🔹 Altro',
        label_checkin: 'Check-in',
        label_checkout: 'Check-out',
        label_indirizzo: 'Indirizzo',
        placeholder_indirizzo: 'Es. Via Roma 12...',
        label_num_prenotazione: 'Numero prenotazione',
        placeholder_num_prenotazione: 'Es. BK123456...',
        label_note: 'Note',
        placeholder_note_alloggio: 'Es. Colazione inclusa...',
        label_prezzo_soggiorno: 'Prezzo totale soggiorno (€)',
        label_allegato_alloggio: 'Allegato (PDF prenotazione, voucher...)',
        btn_aggiungi_alloggio: '+ Aggiungi Alloggio',
        form_interessi_titolo: '📍 Aggiungi un Punto di Interesse',
        label_nome_luogo: 'Nome del luogo',
        placeholder_nome_luogo: 'Es. Torre Eiffel...',
        label_tipo_luogo: 'Tipo di luogo',
        tipo_posto: '👁️ Posto da vedere',
        tipo_ristorante: '🍽️ Ristorante',
        tipo_bar: '🍺 Bar/Pub',
        tipo_attivita: '🎯 Attività',
        tipo_altro: '🔹 Altro',
        label_priorita: 'Priorità',
        priorita_alta: '🔴 Alta — da non perdere',
        priorita_media: "🟡 Media — se c'è tempo",
        priorita_bassa: '🟢 Bassa — opzionale',
        label_citta: 'Città',
        placeholder_citta: 'Es. Parigi, Roma, Tokyo...',
        label_indirizzo_zona: 'Indirizzo o zona',
        placeholder_indirizzo_zona: 'Es. Champ de Mars...',
        placeholder_note_interesse: 'Es. Prenotare in anticipo...',
        label_prezzo_ingresso: 'Prezzo biglietto/ingresso (€)',
        placeholder_prezzo_ingresso: 'Es. 15.00 (lascia vuoto se gratuito)',
        btn_aggiungi_interesse: '+ Aggiungi Punto di Interesse',
        form_note_titolo: '📝 Aggiungi una Nota',
        label_titolo_nota: 'Titolo',
        placeholder_titolo_nota: 'Es. Cose da portare...',
        label_testo_nota: 'Testo',
        placeholder_testo_nota: 'Scrivi qui la tua nota...',
        btn_aggiungi_nota: '+ Aggiungi Nota',
        filtro_citta: '🏙️ Filtra per città:',
        filtro_tutte: 'Tutte',
        impostazioni_titolo: '⚙️ Impostazioni',
        imp_backup_titolo: '💾 Backup dei dati',
        imp_backup_desc: 'I tuoi dati sono salvati localmente sul dispositivo.',
        imp_esporta_titolo: 'Esporta backup',
        imp_esporta_desc: 'Scarica un file con tutti i tuoi dati',
        btn_esporta: '📤 Esporta',
        imp_importa_titolo: 'Importa backup',
        imp_importa_desc: 'Ripristina i dati da un file precedente',
        btn_importa: '📥 Importa',
        imp_come_trasferire: "ℹ️ Come trasferire i dati sull'iPhone",
        imp_step1: 'Clicca <strong>Esporta</strong> su questo PC',
        imp_step2: "Trasferisci il file sull'iPhone (via AirDrop, email, o iCloud Drive)",
        imp_step3: "Apri l'app sull'iPhone e vai su <strong>Impostazioni → Importa</strong>",
        imp_step4: 'Seleziona il file scaricato',
        imp_aspetto_titolo: '🎨 Aspetto',
        imp_dark_titolo: 'Tema scuro',
        imp_dark_desc: 'Passa alla modalità dark',
        imp_lingua_titolo: '🌍 Lingua',
        imp_lingua_label: "Lingua dell'app",
        imp_lingua_desc: "Scegli la lingua dell'interfaccia",
        imp_danger_titolo: '⚠️ Zona pericolosa',
        imp_cancella_titolo: 'Cancella tutti i dati',
        imp_cancella_desc: 'Elimina definitivamente tutti i viaggi e i dati salvati',
        btn_cancella_tutto: '🗑️ Cancella tutto',
        modale_elimina_titolo: '🗑️ Elimina viaggio',
        modale_cancella_titolo: '⚠️ Cancella tutti i dati',
        modale_cancella_testo: "Stai per eliminare tutti i dati dell'app. Questa operazione è irreversibile.",
        btn_conferma_cancella: '🗑️ Sì, cancella tutto',
        btn_annulla: '↩️ Annulla',
        btn_scarica: '⬇️ Scarica',
        vuoto_viaggi: 'Nessun viaggio salvato ancora.',
        vuoto_trasporti: 'Nessun trasporto salvato ancora.',
        vuoto_alloggi: 'Nessun alloggio salvato ancora.',
        vuoto_interessi: 'Nessun punto di interesse salvato ancora.',
        vuoto_note: 'Nessuna nota salvata ancora.',
        vuoto_trasporti_viaggio: 'Nessun trasporto per questo viaggio.',
        vuoto_alloggi_viaggio: 'Nessun alloggio per questo viaggio.',
        vuoto_interessi_viaggio: 'Nessun punto di interesse per questo viaggio.',
        vuoto_note_viaggio: 'Nessuna nota per questo viaggio.',
        vuoto_spese: 'Nessuna spesa registrata per questo viaggio.',
        vuoto_spese_desc: 'Aggiungi un prezzo a trasporti, alloggi o attività.',
        btn_modifica: '✏️ Modifica',
        btn_elimina: '🗑️ Elimina',
        btn_visitato: '✅ Visitato',
        btn_riapri: '↩️ Riapri',
        btn_elimina_viaggio_btn: '🗑️ Elimina viaggio',
        btn_elimina_tutto: '🗑️ Elimina viaggio e tutti i dati collegati',
        btn_elimina_solo: '✂️ Elimina solo il viaggio, mantieni i dati',
        spese_totale: '💰 Totale viaggio',
        spese_trasporti: '🚂 Trasporti',
        spese_alloggi: '🏨 Alloggi',
        spese_attivita: '🎯 Attività e ingressi',
        mappa_caricamento: '🗺️ Caricamento mappa in corso...',
        mappa_nessun_elemento: 'Nessun elemento con indirizzo trovato.<br>Aggiungi indirizzi agli alloggi, interessi o trasporti.',
        mappa_legenda: '📋 Elementi sulla mappa',
        stato_prossimo: '🔵 Prossimo',
        stato_in_corso: '🟢 In corso',
        stato_passato: '✅ Passato',
        riepilogo_partenza: '📅 Partenza',
        riepilogo_ritorno: '📅 Ritorno',
        riepilogo_durata: '⏱️ Durata',
        riepilogo_note: '📝 Note',
        durata_giorno: 'giorno',
        durata_giorni: 'giorni',
        mappa_partenza: 'Partenza',
        mappa_arrivo: 'Arrivo',
        nota_creata: 'Creata il',
        salva_modifiche: '💾 Salva Modifiche',
    },
    en: {
        app_titolo: '✈️ My Trips',
        nav_viaggi: '🌍 My Trips',
        nav_inserimento: '➕ Add Data',
        nav_impostazioni: '⚙️ Settings',
        sidebar_titolo: '📋 Your trips',
        sidebar_vuoto: 'No trips yet.<br>Go to <strong>Add Data</strong> to add one.',
        seleziona_viaggio: '✈️ Select a trip...',
        benvenuto_titolo: 'Welcome!',
        benvenuto_testo: 'Select a trip from the list on the left<br>or create a new one in the<br><strong>Add Data</strong> section.',
        scheda_trasporti: '🚂 Transport',
        scheda_alloggi: '🏨 Accommodation',
        scheda_interessi: '📍 Interests',
        scheda_note: '📝 Notes',
        scheda_mappa: '🗺️ Map',
        scheda_spese: '💰 Expenses',
        ins_viaggi: '🌍 Trips',
        ins_trasporti: '🚂 Transport',
        ins_alloggi: '🏨 Accommodation',
        ins_interessi: '📍 Interests',
        ins_note: '📝 Notes',
        form_viaggi_titolo: '🌍 Add a Trip',
        label_destinazione: 'Destination',
        placeholder_destinazione: 'E.g. Paris, Tokyo...',
        label_data_partenza: 'Departure date',
        label_data_ritorno: 'Return date',
        label_note_rapide: 'Quick notes',
        placeholder_note_rapide: 'E.g. Business trip, holiday...',
        btn_aggiungi_viaggio: '+ Add Trip',
        form_trasporti_titolo: '🚂 Add Transport',
        label_viaggio_rif: 'Related trip',
        seleziona_viaggio_opt: '-- Select a trip --',
        label_mezzo: 'Transport type',
        mezzo_aereo: '✈️ Flight',
        mezzo_treno: '🚂 Train',
        mezzo_auto: '🚗 Car',
        mezzo_autobus: '🚌 Bus',
        mezzo_nave: '🚢 Ferry',
        mezzo_altro: '🔹 Other',
        label_partenza_da: 'Departure from',
        placeholder_partenza_da: 'E.g. Milan Central...',
        label_arrivo_a: 'Arrival at',
        placeholder_arrivo_a: 'E.g. Paris CDG...',
        label_data_ora_partenza: 'Departure date and time',
        label_data_ora_arrivo: 'Arrival date and time',
        label_riferimento: 'Booking / flight / train number',
        placeholder_riferimento: 'E.g. FR1234...',
        label_prezzo: 'Price (€)',
        placeholder_prezzo: 'E.g. 120.50',
        label_allegato_trasporto: 'Attachment (PDF boarding pass, booking...)',
        btn_seleziona_file: '📎 Select file',
        btn_aggiungi_trasporto: '+ Add Transport',
        form_alloggi_titolo: '🏨 Add Accommodation',
        label_nome_struttura: 'Property name',
        placeholder_nome_struttura: 'E.g. Hotel Bellavista...',
        label_tipo_alloggio: 'Accommodation type',
        tipo_hotel: '🏨 Hotel',
        tipo_bnb: '🏡 B&B',
        tipo_airbnb: '🛋️ Airbnb',
        tipo_ostello: '🛏️ Hostel',
        tipo_appartamento: '🏠 Apartment',
        tipo_altro_alloggio: '🔹 Other',
        label_checkin: 'Check-in',
        label_checkout: 'Check-out',
        label_indirizzo: 'Address',
        placeholder_indirizzo: 'E.g. 12 Main Street...',
        label_num_prenotazione: 'Booking number',
        placeholder_num_prenotazione: 'E.g. BK123456...',
        label_note: 'Notes',
        placeholder_note_alloggio: 'E.g. Breakfast included...',
        label_prezzo_soggiorno: 'Total stay price (€)',
        label_allegato_alloggio: 'Attachment (PDF booking, voucher...)',
        btn_aggiungi_alloggio: '+ Add Accommodation',
        form_interessi_titolo: '📍 Add Point of Interest',
        label_nome_luogo: 'Place name',
        placeholder_nome_luogo: 'E.g. Eiffel Tower...',
        label_tipo_luogo: 'Place type',
        tipo_posto: '👁️ Place to see',
        tipo_ristorante: '🍽️ Restaurant',
        tipo_bar: '🍺 Bar/Pub',
        tipo_attivita: '🎯 Activity',
        tipo_altro: '🔹 Other',
        label_priorita: 'Priority',
        priorita_alta: '🔴 High — must see',
        priorita_media: '🟡 Medium — if time allows',
        priorita_bassa: '🟢 Low — optional',
        label_citta: 'City',
        placeholder_citta: 'E.g. Paris, Rome, Tokyo...',
        label_indirizzo_zona: 'Address or area',
        placeholder_indirizzo_zona: 'E.g. Champ de Mars...',
        placeholder_note_interesse: 'E.g. Book in advance...',
        label_prezzo_ingresso: 'Ticket/entry price (€)',
        placeholder_prezzo_ingresso: 'E.g. 15.00 (leave empty if free)',
        btn_aggiungi_interesse: '+ Add Point of Interest',
        form_note_titolo: '📝 Add a Note',
        label_titolo_nota: 'Title',
        placeholder_titolo_nota: 'E.g. Things to pack...',
        label_testo_nota: 'Text',
        placeholder_testo_nota: 'Write your note here...',
        btn_aggiungi_nota: '+ Add Note',
        filtro_citta: '🏙️ Filter by city:',
        filtro_tutte: 'All',
        impostazioni_titolo: '⚙️ Settings',
        imp_backup_titolo: '💾 Data backup',
        imp_backup_desc: 'Your data is saved locally on the device.',
        imp_esporta_titolo: 'Export backup',
        imp_esporta_desc: 'Download a file with all your data',
        btn_esporta: '📤 Export',
        imp_importa_titolo: 'Import backup',
        imp_importa_desc: 'Restore data from a previous file',
        btn_importa: '📥 Import',
        imp_come_trasferire: 'ℹ️ How to transfer data to iPhone',
        imp_step1: 'Click <strong>Export</strong> on this PC',
        imp_step2: 'Transfer the file to your iPhone (via AirDrop, email, or iCloud Drive)',
        imp_step3: 'Open the app on iPhone and go to <strong>Settings → Import</strong>',
        imp_step4: 'Select the downloaded file',
        imp_aspetto_titolo: '🎨 Appearance',
        imp_dark_titolo: 'Dark mode',
        imp_dark_desc: 'Switch to dark theme',
        imp_lingua_titolo: '🌍 Language',
        imp_lingua_label: 'App language',
        imp_lingua_desc: 'Choose the interface language',
        imp_danger_titolo: '⚠️ Danger zone',
        imp_cancella_titolo: 'Delete all data',
        imp_cancella_desc: 'Permanently delete all trips and saved data',
        btn_cancella_tutto: '🗑️ Delete everything',
        modale_elimina_titolo: '🗑️ Delete trip',
        modale_cancella_titolo: '⚠️ Delete all data',
        modale_cancella_testo: 'You are about to delete all app data. This action is irreversible.',
        btn_conferma_cancella: '🗑️ Yes, delete everything',
        btn_annulla: '↩️ Cancel',
        btn_scarica: '⬇️ Download',
        vuoto_viaggi: 'No trips saved yet.',
        vuoto_trasporti: 'No transport saved yet.',
        vuoto_alloggi: 'No accommodation saved yet.',
        vuoto_interessi: 'No points of interest saved yet.',
        vuoto_note: 'No notes saved yet.',
        vuoto_trasporti_viaggio: 'No transport for this trip.',
        vuoto_alloggi_viaggio: 'No accommodation for this trip.',
        vuoto_interessi_viaggio: 'No points of interest for this trip.',
        vuoto_note_viaggio: 'No notes for this trip.',
        vuoto_spese: 'No expenses recorded for this trip.',
        vuoto_spese_desc: 'Add a price to transport, accommodation or activities.',
        btn_modifica: '✏️ Edit',
        btn_elimina: '🗑️ Delete',
        btn_visitato: '✅ Visited',
        btn_riapri: '↩️ Reopen',
        btn_elimina_viaggio_btn: '🗑️ Delete trip',
        btn_elimina_tutto: '🗑️ Delete trip and all related data',
        btn_elimina_solo: '✂️ Delete trip only, keep related data',
        spese_totale: '💰 Trip total',
        spese_trasporti: '🚂 Transport',
        spese_alloggi: '🏨 Accommodation',
        spese_attivita: '🎯 Activities and entry fees',
        mappa_caricamento: '🗺️ Loading map...',
        mappa_nessun_elemento: 'No elements with address found.<br>Add addresses to accommodation, interests or transport.',
        mappa_legenda: '📋 Map elements',
        stato_prossimo: '🔵 Upcoming',
        stato_in_corso: '🟢 Ongoing',
        stato_passato: '✅ Past',
        riepilogo_partenza: '📅 Departure',
        riepilogo_ritorno: '📅 Return',
        riepilogo_durata: '⏱️ Duration',
        riepilogo_note: '📝 Notes',
        durata_giorno: 'day',
        durata_giorni: 'days',
        mappa_partenza: 'Departure',
        mappa_arrivo: 'Arrival',
        nota_creata: 'Created on',
        salva_modifiche: '💾 Save Changes',
    }
};

let linguaAttuale = 'it';

function tr(chiave) {
    return (traduzioni[linguaAttuale] && traduzioni[linguaAttuale][chiave])
        ? traduzioni[linguaAttuale][chiave]
        : (traduzioni['it'][chiave] || chiave);
}

function applicaLingua(lingua) {
    const trad = traduzioni[lingua];
    if (!trad) return;
    linguaAttuale = lingua;

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        const chiave = el.getAttribute('data-i18n');
        if (trad[chiave] !== undefined) {
            el.innerHTML = trad[chiave];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        const chiave = el.getAttribute('data-i18n-placeholder');
        if (trad[chiave] !== undefined) {
            el.placeholder = trad[chiave];
        }
    });

    const selectLingua = document.getElementById('select-lingua');
    if (selectLingua) selectLingua.value = lingua;

    document.documentElement.lang = lingua;

    mostraListaViaggi();
    mostraListaTrasporti();
    mostraListaAlloggi();
    mostraListaInteressi();
    mostraListaNote();
    aggiornaSidebar();
    if (viaggioSelezionatoId) apriViaggio(viaggioSelezionatoId);
}

function cambiaLingua(lingua) {
    linguaAttuale = lingua;
    localStorage.setItem('lingua', lingua);
    applicaLingua(lingua);
}

function caricaLingua() {
    const salvata = localStorage.getItem('lingua');
    if (salvata) {
        linguaAttuale = salvata;
        applicaLingua(salvata);
    }
}

// ============================================
// DARK MODE
// ============================================

function toggleDarkMode() {
    const attivo = document.getElementById('toggle-dark').checked;
    document.body.classList.toggle('dark-mode', attivo);
    localStorage.setItem('darkMode', attivo ? '1' : '0');
}

function applicaDarkMode() {
    const salvato = localStorage.getItem('darkMode');
    if (salvato === '1') {
        document.body.classList.add('dark-mode');
        const toggle = document.getElementById('toggle-dark');
        if (toggle) toggle.checked = true;
    }
}

// ============================================
// NAVIGAZIONE PRINCIPALE (VISTE)
// ============================================

function mostraVista(nomeVista) {
    document.querySelectorAll('.vista').forEach(function(v) {
        v.style.display = 'none';
    });
    document.getElementById(nomeVista).style.display = 'block';

    document.querySelectorAll('.nav-btn').forEach(function(b) {
        b.classList.remove('attivo');
    });

    if (nomeVista === 'vista-viaggi') {
        document.getElementById('nav-viaggi').classList.add('attivo');
        aggiornaSidebar();
    }
    if (nomeVista === 'vista-inserimento') {
        document.getElementById('nav-inserimento').classList.add('attivo');
        mostraSezione('viaggi');
    }
    if (nomeVista === 'vista-impostazioni') {
        document.getElementById('nav-impostazioni').classList.add('attivo');
    }
}

// ============================================
// NAVIGAZIONE SEZIONI INSERIMENTO
// ============================================

function mostraSezione(nomeSezione) {
    document.querySelectorAll('.inserimento-contenuto section').forEach(function(s) {
        s.style.display = 'none';
    });
    document.getElementById(nomeSezione).style.display = 'block';

    document.querySelectorAll('.ins-btn').forEach(function(b) {
        b.classList.remove('attivo');
    });
    document.getElementById('ins-' + nomeSezione).classList.add('attivo');

    if (nomeSezione === 'trasporti') popolaMenuViaggi('trasporto-viaggio');
    if (nomeSezione === 'alloggi') popolaMenuViaggi('alloggio-viaggio');
    if (nomeSezione === 'interessi') {
        popolaMenuViaggi('interesse-viaggio');
        aggiornaSuggerimentiCitta();
    }
    if (nomeSezione === 'note') popolaMenuViaggi('nota-viaggio');
}

// ============================================
// NAVIGAZIONE SCHEDE DETTAGLIO VIAGGIO
// ============================================

function mostraScheda(nomeScheda) {
    document.querySelectorAll('.scheda').forEach(function(s) {
        s.style.display = 'none';
    });
    document.getElementById(nomeScheda).style.display = 'block';

    document.querySelectorAll('.scheda-btn').forEach(function(b) {
        b.classList.remove('attivo');
    });
    document.getElementById('btn-' + nomeScheda).classList.add('attivo');

    if (nomeScheda === 'scheda-mappa' && viaggioSelezionatoId) {
        setTimeout(function() {
            caricaMappa(viaggioSelezionatoId);
        }, 100);
    }
    if (nomeScheda === 'scheda-spese' && viaggioSelezionatoId) {
        caricaSchedaSpese(viaggioSelezionatoId);
    }
}

// ============================================
// SIDEBAR E DETTAGLIO VIAGGIO
// ============================================

function aggiornaSidebar() {
    const lista = leggiViaggi();
    const contenitore = document.getElementById('sidebar-lista');

    if (lista.length === 0) {
        contenitore.innerHTML = `<p style="color:#bbb; font-size:13px;">${tr('sidebar_vuoto')}</p>`;
        aggiornaSeletttoreMobile();
        return;
    }

    contenitore.innerHTML = lista.map(function(v) {
        const selezionato = v.id === viaggioSelezionatoId ? 'selezionato' : '';

        let stato = '';
        let statoClasse = '';
        if (v.partenza && v.ritorno) {
            const oggi = new Date();
            oggi.setHours(0, 0, 0, 0);
            const p = new Date(v.partenza);
            const r = new Date(v.ritorno);
            if (oggi < p) { stato = tr('stato_prossimo'); statoClasse = 'stato-prossimo'; }
            else if (oggi > r) { stato = tr('stato_passato'); statoClasse = 'stato-passato'; }
            else { stato = tr('stato_in_corso'); statoClasse = 'stato-in-corso'; }
        }

        return `
            <div class="sidebar-card ${selezionato}" onclick="apriViaggio(${v.id})">
                <h4>📍 ${v.destinazione}</h4>
                <p>${v.partenza || '—'} → ${v.ritorno || '—'}</p>
                ${stato ? `<span class="stato-tag ${statoClasse}">${stato}</span>` : ''}
            </div>
        `;
    }).join('');

    aggiornaSeletttoreMobile();
}

function apriViaggio(id) {
    viaggioSelezionatoId = id;
    aggiornaSidebar();

    const viaggi = leggiViaggi();
    const viaggio = viaggi.find(function(v) { return v.id === id; });
    if (!viaggio) return;

    document.getElementById('schermata-benvenuto').style.display = 'none';
    document.getElementById('dettaglio-viaggio').style.display = 'block';

    document.getElementById('dettaglio-titolo').innerHTML =
        '✈️ ' + viaggio.destinazione +
        `<button class="btn-elimina-viaggio" onclick="eliminaViaggio(${viaggio.id})">
            ${tr('btn_elimina_viaggio_btn')}
        </button>`;

    let giorni = '—';
    if (viaggio.partenza && viaggio.ritorno) {
        const p = new Date(viaggio.partenza);
        const r = new Date(viaggio.ritorno);
        const diff = Math.round((r - p) / (1000 * 60 * 60 * 24));
        giorni = diff + ' ' + (diff === 1 ? tr('durata_giorno') : tr('durata_giorni'));
    }

    document.getElementById('dettaglio-riepilogo').innerHTML = `
        <div class="riepilogo-griglia">
            <div class="riepilogo-item">
                <div class="etichetta">${tr('riepilogo_partenza')}</div>
                <div class="valore">${formattaDataBreve(viaggio.partenza)}</div>
            </div>
            <div class="riepilogo-item">
                <div class="etichetta">${tr('riepilogo_ritorno')}</div>
                <div class="valore">${formattaDataBreve(viaggio.ritorno)}</div>
            </div>
            <div class="riepilogo-item">
                <div class="etichetta">${tr('riepilogo_durata')}</div>
                <div class="valore">${giorni}</div>
            </div>
            <div class="riepilogo-item">
                <div class="etichetta">${tr('riepilogo_note')}</div>
                <div class="valore">${viaggio.note || '—'}</div>
            </div>
        </div>
    `;

    mostraScheda('scheda-trasporti');
    caricaSchedaTrasporti(id);
    caricaSchedaAlloggi(id);
    caricaSchedaInteressi(id);
    caricaSchedaNote(id);
    caricaSchedaSpese(id);
}

// ============================================
// SCHEDE DETTAGLIO
// ============================================

function caricaSchedaTrasporti(viaggioId) {
    const tutti = leggiTrasporti();
    const filtrati = tutti.filter(function(item) { return item.viaggioId === viaggioId; });
    const contenitore = document.getElementById('scheda-trasporti');

    if (filtrati.length === 0) {
        contenitore.innerHTML = `<p style="color:#999;">${tr('vuoto_trasporti_viaggio')}</p>`;
        return;
    }

    contenitore.innerHTML = filtrati.map(function(item) {
        return `
            <div class="trasporto-card">
                <div>
                    <h4>${iconaMezzo(item.mezzo)} ${item.da} → ${item.a}</h4>
                    <p>🕐 ${tr('riepilogo_partenza')}: ${formattaData(item.dataPartenza)}</p>
                    <p>🕐 ${tr('riepilogo_ritorno')}: ${formattaData(item.dataArrivo)}</p>
                    ${item.riferimento ? `<p>🔖 ${item.riferimento}</p>` : ''}
                    ${item.prezzo ? `<p class="prezzo-tag">💶 ${item.prezzo.toFixed(2).replace('.', ',')} €</p>` : ''}
                    ${item.allegato ? `<p class="allegato-tag" onclick="apriAllegato('${item.allegato.dati}', '${item.allegato.nome}', '${item.allegato.tipo}')">📎 ${item.allegato.nome}</p>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaTrasporto(${item.id})">✏️</button>
                    <button class="btn-elimina" onclick="eliminaTrasporto(${item.id})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

function caricaSchedaAlloggi(viaggioId) {
    const tutti = leggiAlloggi();
    const filtrati = tutti.filter(function(item) { return item.viaggioId === viaggioId; });
    const contenitore = document.getElementById('scheda-alloggi');

    if (filtrati.length === 0) {
        contenitore.innerHTML = `<p style="color:#999;">${tr('vuoto_alloggi_viaggio')}</p>`;
        return;
    }

    contenitore.innerHTML = filtrati.map(function(item) {
        return `
            <div class="alloggio-card">
                <div>
                    <h4>${iconaTipo(item.tipo)} ${item.nome}</h4>
                    <p>📅 Check-in: ${formattaData(item.checkin)}</p>
                    <p>📅 Check-out: ${formattaData(item.checkout)}</p>
                    ${item.indirizzo ? `<p>📌 ${item.indirizzo}</p>` : ''}
                    ${item.riferimento ? `<p>🔖 ${item.riferimento}</p>` : ''}
                    ${item.note ? `<p>📝 ${item.note}</p>` : ''}
                    ${item.prezzo ? `<p class="prezzo-tag">💶 ${item.prezzo.toFixed(2).replace('.', ',')} €</p>` : ''}
                    ${item.allegato ? `<p class="allegato-tag" onclick="apriAllegato('${item.allegato.dati}', '${item.allegato.nome}', '${item.allegato.tipo}')">📎 ${item.allegato.nome}</p>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaAlloggio(${item.id})">✏️</button>
                    <button class="btn-elimina" onclick="eliminaAlloggio(${item.id})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

function caricaSchedaInteressi(viaggioId, cittaFiltro) {
    const tutti = leggiInteressi();
    const filtrati = tutti.filter(function(item) { return item.viaggioId === viaggioId; });
    const contenitore = document.getElementById('scheda-interessi-lista');
    const filtroCont = document.getElementById('filtro-citta-contenitore');
    const filtroBottoni = document.getElementById('filtro-citta-bottoni');

    if (filtrati.length === 0) {
        filtroCont.style.display = 'none';
        contenitore.innerHTML = `<p style="color:#999;">${tr('vuoto_interessi_viaggio')}</p>`;
        return;
    }

    const citta = [...new Set(filtrati.map(function(item) { return item.citta; }).filter(Boolean))];

    if (citta.length > 1) {
        filtroCont.style.display = 'block';
        filtroBottoni.innerHTML =
            `<button class="filtro-btn ${!cittaFiltro ? 'attivo' : ''}"
                onclick="caricaSchedaInteressi(${viaggioId}, null)">
                ${tr('filtro_tutte')}
            </button>` +
            citta.map(function(c) {
                return `<button class="filtro-btn ${cittaFiltro === c ? 'attivo' : ''}"
                    onclick="caricaSchedaInteressi(${viaggioId}, '${c}')">
                    🏙️ ${c}
                </button>`;
            }).join('');
    } else {
        filtroCont.style.display = 'none';
    }

    const damostrare = cittaFiltro
        ? filtrati.filter(function(item) { return item.citta === cittaFiltro; })
        : filtrati;

    const ordine = { alta: 1, media: 2, bassa: 3 };
    const ordinati = [...damostrare].sort(function(a, b) {
        return ordine[a.priorita] - ordine[b.priorita];
    });

    contenitore.innerHTML = ordinati.map(function(item) {
        return `
            <div class="interesse-card" style="${item.visitato ? 'opacity:0.5;' : ''}">
                <div>
                    ${item.citta ? `<span class="tag-citta">🏙️ ${item.citta}</span>` : ''}
                    <span class="tag-priorita priorita-${item.priorita}">
                        ${item.priorita === 'alta' ? '🔴 Alta' : item.priorita === 'media' ? '🟡 Media' : '🟢 Bassa'}
                    </span>
                    <h4>${iconaInteresse(item.tipo)} ${item.nome}</h4>
                    ${item.indirizzo ? `<p>📌 ${item.indirizzo}</p>` : ''}
                    ${item.note ? `<p>📝 ${item.note}</p>` : ''}
                    ${item.prezzo ? `<p class="prezzo-tag">💶 ${item.prezzo.toFixed(2).replace('.', ',')} €</p>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaInteresse(${item.id})">✏️</button>
                    <button class="btn-elimina" onclick="eliminaInteresse(${item.id})">🗑️</button>
                    <button class="btn-visitato" onclick="toggleVisitato(${item.id})">
                        ${item.visitato ? '↩️' : '✅'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function caricaSchedaNote(viaggioId) {
    const tutte = leggiNote();
    const filtrate = tutte.filter(function(item) { return item.viaggioId === viaggioId; });
    const contenitore = document.getElementById('scheda-note');

    if (filtrate.length === 0) {
        contenitore.innerHTML = `<p style="color:#999;">${tr('vuoto_note_viaggio')}</p>`;
        return;
    }

    contenitore.innerHTML = [...filtrate].reverse().map(function(item) {
        return `
            <div class="nota-card">
                <div style="flex:1;">
                    <h4>📝 ${item.titolo}</h4>
                    <div class="nota-testo">${item.testo}</div>
                    <div class="nota-data">🕐 ${tr('nota_creata')} ${item.data}</div>
                </div>
                <div style="display:flex; flex-direction:column; gap:6px; margin-left:12px;">
                    <button class="btn-modifica" onclick="modificaNota(${item.id})">✏️</button>
                    <button class="btn-elimina" onclick="eliminaNota(${item.id})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

function caricaSchedaSpese(viaggioId) {
    const contenitore = document.getElementById('scheda-spese');

    const trasporti = leggiTrasporti().filter(function(item) { return item.viaggioId === viaggioId; });
    const alloggi = leggiAlloggi().filter(function(item) { return item.viaggioId === viaggioId; });
    const interessi = leggiInteressi().filter(function(item) {
        return item.viaggioId === viaggioId && item.prezzo > 0;
    });

    const totaleTrasporti = trasporti.reduce(function(sum, item) { return sum + (item.prezzo || 0); }, 0);
    const totaleAlloggi = alloggi.reduce(function(sum, item) { return sum + (item.prezzo || 0); }, 0);
    const totaleInteressi = interessi.reduce(function(sum, item) { return sum + (item.prezzo || 0); }, 0);
    const totaleGenerale = totaleTrasporti + totaleAlloggi + totaleInteressi;

    function euro(importo) {
        return importo.toFixed(2).replace('.', ',') + ' €';
    }

    const nessunDato = totaleTrasporti === 0 && totaleAlloggi === 0 && totaleInteressi === 0;
    if (nessunDato) {
        contenitore.innerHTML = `
            <div class="spese-vuoto">
                <p>${tr('vuoto_spese')}</p>
                <p style="font-size:13px; color:#aaa;">${tr('vuoto_spese_desc')}</p>
            </div>
        `;
        return;
    }

    contenitore.innerHTML = `
        <div class="spese-riepilogo">
            <div class="spesa-totale-card">
                <div class="spesa-totale-etichetta">${tr('spese_totale')}</div>
                <div class="spesa-totale-valore">${euro(totaleGenerale)}</div>
            </div>
            <div class="spese-categorie-bar">
                ${totaleTrasporti > 0 ? `
                <div class="spesa-categoria-pill trasporti">
                    <span>${tr('spese_trasporti')}</span>
                    <strong>${euro(totaleTrasporti)}</strong>
                </div>` : ''}
                ${totaleAlloggi > 0 ? `
                <div class="spesa-categoria-pill alloggi">
                    <span>${tr('spese_alloggi')}</span>
                    <strong>${euro(totaleAlloggi)}</strong>
                </div>` : ''}
                ${totaleInteressi > 0 ? `
                <div class="spesa-categoria-pill interessi">
                    <span>${tr('spese_attivita')}</span>
                    <strong>${euro(totaleInteressi)}</strong>
                </div>` : ''}
            </div>
        </div>

        ${totaleTrasporti > 0 ? `
        <div class="spese-gruppo">
            <div class="spese-gruppo-header">
                <span>${tr('spese_trasporti')}</span>
                <span>${euro(totaleTrasporti)}</span>
            </div>
            ${trasporti.filter(function(item) { return item.prezzo; }).map(function(item) {
                return `<div class="spesa-riga">
                    <span>${iconaMezzo(item.mezzo)} ${item.da} → ${item.a}</span>
                    <span class="spesa-importo">${euro(item.prezzo)}</span>
                </div>`;
            }).join('')}
        </div>` : ''}

        ${totaleAlloggi > 0 ? `
        <div class="spese-gruppo">
            <div class="spese-gruppo-header">
                <span>${tr('spese_alloggi')}</span>
                <span>${euro(totaleAlloggi)}</span>
            </div>
            ${alloggi.filter(function(item) { return item.prezzo; }).map(function(item) {
                return `<div class="spesa-riga">
                    <span>${iconaTipo(item.tipo)} ${item.nome}</span>
                    <span class="spesa-importo">${euro(item.prezzo)}</span>
                </div>`;
            }).join('')}
        </div>` : ''}

        ${totaleInteressi > 0 ? `
        <div class="spese-gruppo">
            <div class="spese-gruppo-header">
                <span>${tr('spese_attivita')}</span>
                <span>${euro(totaleInteressi)}</span>
            </div>
            ${interessi.map(function(item) {
                return `<div class="spesa-riga">
                    <span>${iconaInteresse(item.tipo)} ${item.nome}</span>
                    <span class="spesa-importo">${euro(item.prezzo)}</span>
                </div>`;
            }).join('')}
        </div>` : ''}
    `;
}

// ============================================
// UTILITY DATE
// ============================================

function formattaData(dataStringa) {
    if (!dataStringa) return '—';
    const data = new Date(dataStringa);
    return data.toLocaleString('it-IT', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

function formattaDataBreve(dataStringa) {
    if (!dataStringa) return '—';
    const data = new Date(dataStringa);
    return data.toLocaleDateString('it-IT', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
}

// ============================================
// GESTIONE VIAGGI
// ============================================

function leggiViaggi() {
    const dati = localStorage.getItem('viaggi');
    return dati ? JSON.parse(dati) : [];
}

function salvaViaggi(lista) {
    localStorage.setItem('viaggi', JSON.stringify(lista));
}

function aggiungiViaggio() {
    const destinazione = document.getElementById('viaggio-destinazione').value.trim();
    const partenza = document.getElementById('viaggio-partenza').value;
    const ritorno = document.getElementById('viaggio-ritorno').value;
    const note = document.getElementById('viaggio-note').value.trim();

    if (!destinazione) {
        alert('Inserisci almeno la destinazione!');
        return;
    }

    const lista = leggiViaggi();

    if (viaggioInModifica !== null) {
        const aggiornata = lista.map(function(v) {
            if (v.id === viaggioInModifica) {
                return { ...v, destinazione, partenza, ritorno, note };
            }
            return v;
        });
        salvaViaggi(aggiornata);
        viaggioInModifica = null;
        document.querySelector('#viaggi .btn-aggiungi').textContent = tr('btn_aggiungi_viaggio');
        if (viaggioSelezionatoId) apriViaggio(viaggioSelezionatoId);
    } else {
        lista.push({ id: Date.now(), destinazione, partenza, ritorno, note });
        salvaViaggi(lista);
    }

    document.getElementById('viaggio-destinazione').value = '';
    document.getElementById('viaggio-partenza').value = '';
    document.getElementById('viaggio-ritorno').value = '';
    document.getElementById('viaggio-note').value = '';
    chiudiAccordion('form-viaggi');

    mostraListaViaggi();
    aggiornaSidebar();
}

function modificaViaggio(id) {
    const lista = leggiViaggi();
    const v = lista.find(function(v) { return v.id === id; });
    if (!v) return;

    mostraVista('vista-inserimento');
    mostraSezione('viaggi');

    document.getElementById('viaggio-destinazione').value = v.destinazione;
    document.getElementById('viaggio-partenza').value = v.partenza;
    document.getElementById('viaggio-ritorno').value = v.ritorno;
    document.getElementById('viaggio-note').value = v.note;

    viaggioInModifica = id;
    document.querySelector('#viaggi .btn-aggiungi').textContent = tr('salva_modifiche');
    apriAccordion('form-viaggi');
    document.getElementById('viaggio-destinazione').scrollIntoView({ behavior: 'smooth' });
}

function eliminaViaggio(id) {
    const viaggi = leggiViaggi();
    const viaggio = viaggi.find(function(v) { return v.id === id; });
    if (!viaggio) return;

    const nTrasporti = leggiTrasporti().filter(function(item) { return item.viaggioId === id; }).length;
    const nAlloggi = leggiAlloggi().filter(function(item) { return item.viaggioId === id; }).length;
    const nInteressi = leggiInteressi().filter(function(item) { return item.viaggioId === id; }).length;
    const nNote = leggiNote().filter(function(item) { return item.viaggioId === id; }).length;
    const totaleCollegati = nTrasporti + nAlloggi + nInteressi + nNote;

    viaggioInEliminazione = id;

    let messaggio = `Stai per eliminare il viaggio <strong>${viaggio.destinazione}</strong>.`;

    if (totaleCollegati > 0) {
        messaggio += `<br><br>Sono presenti dati collegati:<br>`;
        if (nTrasporti > 0) messaggio += `• ${nTrasporti} trasporto/i<br>`;
        if (nAlloggi > 0) messaggio += `• ${nAlloggi} alloggio/i<br>`;
        if (nInteressi > 0) messaggio += `• ${nInteressi} punto/i di interesse<br>`;
        if (nNote > 0) messaggio += `• ${nNote} nota/e<br>`;
        messaggio += `<br>Come vuoi procedere?`;

        document.getElementById('modale-elimina-bottoni').innerHTML = `
            <button class="btn-modale-elimina-tutto" onclick="confermaEliminaViaggio('tutto')">
                ${tr('btn_elimina_tutto')}
            </button>
            <button class="btn-modale-elimina-solo" onclick="confermaEliminaViaggio('solo')">
                ${tr('btn_elimina_solo')}
            </button>
            <button class="btn-modale-annulla" onclick="chiudiModaleEliminaViaggio()">
                ${tr('btn_annulla')}
            </button>
        `;
    } else {
        messaggio += `<br><br>Non ci sono dati collegati. Vuoi procedere?`;

        document.getElementById('modale-elimina-bottoni').innerHTML = `
            <button class="btn-modale-elimina-tutto" onclick="confermaEliminaViaggio('tutto')">
                ${tr('btn_elimina_viaggio_btn')}
            </button>
            <button class="btn-modale-annulla" onclick="chiudiModaleEliminaViaggio()">
                ${tr('btn_annulla')}
            </button>
        `;
    }

    document.getElementById('modale-elimina-messaggio').innerHTML = messaggio;
    document.getElementById('modale-elimina-viaggio').style.display = 'flex';
}

function confermaEliminaViaggio(modalita) {
    const id = viaggioInEliminazione;
    if (!id) return;

    salvaViaggi(leggiViaggi().filter(function(v) { return v.id !== id; }));

    if (modalita === 'tutto') {
        salvaTrasporti(leggiTrasporti().filter(function(item) { return item.viaggioId !== id; }));
        salvaAlloggi(leggiAlloggi().filter(function(item) { return item.viaggioId !== id; }));
        salvaInteressi(leggiInteressi().filter(function(item) { return item.viaggioId !== id; }));
        salvaNote(leggiNote().filter(function(item) { return item.viaggioId !== id; }));
    }

    if (viaggioSelezionatoId === id) {
        viaggioSelezionatoId = null;
        document.getElementById('schermata-benvenuto').style.display = 'block';
        document.getElementById('dettaglio-viaggio').style.display = 'none';
    }

    chiudiModaleEliminaViaggio();
    mostraListaViaggi();
    mostraListaTrasporti();
    mostraListaAlloggi();
    mostraListaInteressi();
    mostraListaNote();
    aggiornaSidebar();
}

function chiudiModaleEliminaViaggio() {
    viaggioInEliminazione = null;
    document.getElementById('modale-elimina-viaggio').style.display = 'none';
}

function mostraListaViaggi() {
    const lista = leggiViaggi();
    const contenitore = document.getElementById('lista-viaggi');

    if (lista.length === 0) {
        contenitore.innerHTML = `<p style="color:#999;">${tr('vuoto_viaggi')}</p>`;
        return;
    }

    contenitore.innerHTML = lista.map(function(v) {
        return `
            <div class="viaggio-card">
                <div>
                    <h4>📍 ${v.destinazione}</h4>
                    <p>🗓️ ${v.partenza || '—'} → ${v.ritorno || '—'}</p>
                    <p>${v.note || ''}</p>
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaViaggio(${v.id})">${tr('btn_modifica')}</button>
                    <button class="btn-elimina" onclick="eliminaViaggio(${v.id})">${tr('btn_elimina')}</button>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// GESTIONE TRASPORTI
// ============================================

function leggiTrasporti() {
    const dati = localStorage.getItem('trasporti');
    return dati ? JSON.parse(dati) : [];
}

function salvaTrasporti(lista) {
    localStorage.setItem('trasporti', JSON.stringify(lista));
}

function popolaMenuViaggi(selectId) {
    const lista = leggiViaggi();
    const select = document.getElementById(selectId);
    select.innerHTML = `<option value="">${tr('seleziona_viaggio_opt')}</option>`;
    lista.forEach(function(v) {
        const opzione = document.createElement('option');
        opzione.value = v.id;
        opzione.textContent = v.destinazione;
        select.appendChild(opzione);
    });
}

function aggiungiTrasporto() {
    const viaggioId = document.getElementById('trasporto-viaggio').value;
    const mezzo = document.getElementById('trasporto-mezzo').value;
    const da = document.getElementById('trasporto-da').value.trim();
    const a = document.getElementById('trasporto-a').value.trim();
    const dataPartenza = document.getElementById('trasporto-data-partenza').value;
    const dataArrivo = document.getElementById('trasporto-data-arrivo').value;
    const riferimento = document.getElementById('trasporto-riferimento').value.trim();
    const prezzo = parseFloat(document.getElementById('trasporto-prezzo').value) || 0;

    if (!viaggioId || !da || !a) {
        alert('Seleziona il viaggio e inserisci partenza e arrivo!');
        return;
    }

    const viaggi = leggiViaggi();
    const viaggioCollegato = viaggi.find(function(v) { return v.id === parseInt(viaggioId); });
    const lista = leggiTrasporti();

    if (trasportoInModifica !== null) {
        const aggiornata = lista.map(function(item) {
            if (item.id === trasportoInModifica) {
                return { ...item, viaggioId: parseInt(viaggioId),
                    viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : '—',
                    mezzo, da, a, dataPartenza, dataArrivo, riferimento, prezzo,
                    allegato: allegatiTemp.trasporto !== null ? allegatiTemp.trasporto : item.allegato };
            }
            return item;
        });
        salvaTrasporti(aggiornata);
        trasportoInModifica = null;
        document.querySelector('#trasporti .btn-aggiungi').textContent = tr('btn_aggiungi_trasporto');
    } else {
        lista.push({
            id: Date.now(), viaggioId: parseInt(viaggioId),
            viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : '—',
            mezzo, da, a, dataPartenza, dataArrivo, riferimento, prezzo,
            allegato: allegatiTemp.trasporto
        });
        salvaTrasporti(lista);
    }

    document.getElementById('trasporto-da').value = '';
    document.getElementById('trasporto-a').value = '';
    document.getElementById('trasporto-data-partenza').value = '';
    document.getElementById('trasporto-data-arrivo').value = '';
    document.getElementById('trasporto-riferimento').value = '';
    document.getElementById('trasporto-prezzo').value = '';
    resetAllegato('trasporto');
    chiudiAccordion('form-trasporti');

    mostraListaTrasporti();
    if (viaggioSelezionatoId === parseInt(viaggioId)) caricaSchedaTrasporti(parseInt(viaggioId));
}

function modificaTrasporto(id) {
    const lista = leggiTrasporti();
    const item = lista.find(function(item) { return item.id === id; });
    if (!item) return;

    mostraVista('vista-inserimento');
    mostraSezione('trasporti');

    document.getElementById('trasporto-viaggio').value = item.viaggioId;
    document.getElementById('trasporto-mezzo').value = item.mezzo;
    document.getElementById('trasporto-da').value = item.da;
    document.getElementById('trasporto-a').value = item.a;
    document.getElementById('trasporto-data-partenza').value = item.dataPartenza;
    document.getElementById('trasporto-data-arrivo').value = item.dataArrivo;
    document.getElementById('trasporto-riferimento').value = item.riferimento;
    document.getElementById('trasporto-prezzo').value = item.prezzo || '';

    if (item.allegato) {
        allegatiTemp.trasporto = item.allegato;
        document.getElementById('trasporto-allegato-nome').textContent = '📄 ' + item.allegato.nome;
        document.getElementById('trasporto-allegato-rimuovi').style.display = 'inline-block';
    } else {
        resetAllegato('trasporto');
    }

    trasportoInModifica = id;
    document.querySelector('#trasporti .btn-aggiungi').textContent = tr('salva_modifiche');
    apriAccordion('form-trasporti');
    document.getElementById('trasporto-da').scrollIntoView({ behavior: 'smooth' });
}

function eliminaTrasporto(id) {
    const lista = leggiTrasporti();
    salvaTrasporti(lista.filter(function(item) { return item.id !== id; }));
    mostraListaTrasporti();
    if (viaggioSelezionatoId) caricaSchedaTrasporti(viaggioSelezionatoId);
}

function iconaMezzo(mezzo) {
    const icone = { aereo: '✈️', treno: '🚂', auto: '🚗', autobus: '🚌', nave: '🚢', altro: '🔹' };
    return icone[mezzo] || '🔹';
}

function mostraListaTrasporti() {
    const lista = leggiTrasporti();
    const contenitore = document.getElementById('lista-trasporti');
    if (lista.length === 0) {
        contenitore.innerHTML = `<p style="color:#999;">${tr('vuoto_trasporti')}</p>`;
        return;
    }

    const viaggi = leggiViaggi();
    const gruppi = {};
    lista.forEach(function(item) {
        const key = item.viaggioId || 'nessuno';
        if (!gruppi[key]) gruppi[key] = [];
        gruppi[key].push(item);
    });

    contenitore.innerHTML = Object.keys(gruppi).map(function(key) {
        const nome = key === 'nessuno' ? '—' :
            (viaggi.find(function(v) { return v.id === parseInt(key); }) || {}).destinazione || '—';
        const elementi = gruppi[key];
        const uid = 'gt-trasporti-' + key;
        return `
            <div class="gruppo-viaggio-header" onclick="toggleGruppo('${uid}')">
                <h4>📍 ${nome} <span class="gruppo-badge">${elementi.length}</span></h4>
                <span class="gruppo-icona">▼</span>
            </div>
            <div class="gruppo-viaggio-corpo" id="${uid}">
                ${elementi.map(function(item) {
                    return `<div class="trasporto-card">
                        <div>
                            <span class="tag-viaggio">📍 ${item.viaggioNome}</span>
                            <h4>${iconaMezzo(item.mezzo)} ${item.da} → ${item.a}</h4>
                            <p>🕐 Partenza: ${formattaData(item.dataPartenza)}</p>
                            <p>🕐 Arrivo: ${formattaData(item.dataArrivo)}</p>
                            ${item.riferimento ? `<p>🔖 ${item.riferimento}</p>` : ''}
                            ${item.prezzo ? `<p class="prezzo-tag">💶 ${item.prezzo.toFixed(2).replace('.', ',')} €</p>` : ''}
                        </div>
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            <button class="btn-modifica" onclick="modificaTrasporto(${item.id})">${tr('btn_modifica')}</button>
                            <button class="btn-elimina" onclick="eliminaTrasporto(${item.id})">${tr('btn_elimina')}</button>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        `;
    }).join('');
}

// ============================================
// GESTIONE ALLOGGI
// ============================================

function leggiAlloggi() {
    const dati = localStorage.getItem('alloggi');
    return dati ? JSON.parse(dati) : [];
}

function salvaAlloggi(lista) {
    localStorage.setItem('alloggi', JSON.stringify(lista));
}

function aggiungiAlloggio() {
    const viaggioId = document.getElementById('alloggio-viaggio').value;
    const nome = document.getElementById('alloggio-nome').value.trim();
    const tipo = document.getElementById('alloggio-tipo').value;
    const checkin = document.getElementById('alloggio-checkin').value;
    const checkout = document.getElementById('alloggio-checkout').value;
    const indirizzo = document.getElementById('alloggio-indirizzo').value.trim();
    const riferimento = document.getElementById('alloggio-riferimento').value.trim();
    const note = document.getElementById('alloggio-note').value.trim();
    const prezzo = parseFloat(document.getElementById('alloggio-prezzo').value) || 0;

    if (!viaggioId || !nome) {
        alert('Seleziona il viaggio e inserisci il nome della struttura!');
        return;
    }

    const viaggi = leggiViaggi();
    const viaggioCollegato = viaggi.find(function(v) { return v.id === parseInt(viaggioId); });
    const lista = leggiAlloggi();

    if (alloggioInModifica !== null) {
        const aggiornata = lista.map(function(item) {
            if (item.id === alloggioInModifica) {
                return { ...item, viaggioId: parseInt(viaggioId),
                    viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : '—',
                    nome, tipo, checkin, checkout, indirizzo, riferimento, note, prezzo,
                    allegato: allegatiTemp.alloggio !== null ? allegatiTemp.alloggio : item.allegato };
            }
            return item;
        });
        salvaAlloggi(aggiornata);
        alloggioInModifica = null;
        document.querySelector('#alloggi .btn-aggiungi').textContent = tr('btn_aggiungi_alloggio');
    } else {
        lista.push({
            id: Date.now(), viaggioId: parseInt(viaggioId),
            viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : '—',
            nome, tipo, checkin, checkout, indirizzo, riferimento, note, prezzo,
            allegato: allegatiTemp.alloggio
        });
        salvaAlloggi(lista);
    }

    document.getElementById('alloggio-nome').value = '';
    document.getElementById('alloggio-checkin').value = '';
    document.getElementById('alloggio-checkout').value = '';
    document.getElementById('alloggio-indirizzo').value = '';
    document.getElementById('alloggio-riferimento').value = '';
    document.getElementById('alloggio-note').value = '';
    document.getElementById('alloggio-prezzo').value = '';
    resetAllegato('alloggio');
    chiudiAccordion('form-alloggi');

    mostraListaAlloggi();
    if (viaggioSelezionatoId === parseInt(viaggioId)) caricaSchedaAlloggi(parseInt(viaggioId));
}

function modificaAlloggio(id) {
    const lista = leggiAlloggi();
    const item = lista.find(function(item) { return item.id === id; });
    if (!item) return;

    mostraVista('vista-inserimento');
    mostraSezione('alloggi');

    document.getElementById('alloggio-viaggio').value = item.viaggioId;
    document.getElementById('alloggio-nome').value = item.nome;
    document.getElementById('alloggio-tipo').value = item.tipo;
    document.getElementById('alloggio-checkin').value = item.checkin;
    document.getElementById('alloggio-checkout').value = item.checkout;
    document.getElementById('alloggio-indirizzo').value = item.indirizzo;
    document.getElementById('alloggio-riferimento').value = item.riferimento;
    document.getElementById('alloggio-note').value = item.note;
    document.getElementById('alloggio-prezzo').value = item.prezzo || '';

    if (item.allegato) {
        allegatiTemp.alloggio = item.allegato;
        document.getElementById('alloggio-allegato-nome').textContent = '📄 ' + item.allegato.nome;
        document.getElementById('alloggio-allegato-rimuovi').style.display = 'inline-block';
    } else {
        resetAllegato('alloggio');
    }

    alloggioInModifica = id;
    document.querySelector('#alloggi .btn-aggiungi').textContent = tr('salva_modifiche');
    apriAccordion('form-alloggi');
    document.getElementById('alloggio-nome').scrollIntoView({ behavior: 'smooth' });
}

function eliminaAlloggio(id) {
    const lista = leggiAlloggi();
    salvaAlloggi(lista.filter(function(item) { return item.id !== id; }));
    mostraListaAlloggi();
    if (viaggioSelezionatoId) caricaSchedaAlloggi(viaggioSelezionatoId);
}

function iconaTipo(tipo) {
    const icone = { hotel: '🏨', bnb: '🏡', airbnb: '🛋️', ostello: '🛏️', appartamento: '🏠', altro: '🔹' };
    return icone[tipo] || '🔹';
}

function mostraListaAlloggi() {
    const lista = leggiAlloggi();
    const contenitore = document.getElementById('lista-alloggi');
    if (lista.length === 0) {
        contenitore.innerHTML = `<p style="color:#999;">${tr('vuoto_alloggi')}</p>`;
        return;
    }

    const viaggi = leggiViaggi();
    const gruppi = {};
    lista.forEach(function(item) {
        const key = item.viaggioId || 'nessuno';
        if (!gruppi[key]) gruppi[key] = [];
        gruppi[key].push(item);
    });

    contenitore.innerHTML = Object.keys(gruppi).map(function(key) {
        const nome = key === 'nessuno' ? '—' :
            (viaggi.find(function(v) { return v.id === parseInt(key); }) || {}).destinazione || '—';
        const elementi = gruppi[key];
        const uid = 'gt-alloggi-' + key;
        return `
            <div class="gruppo-viaggio-header" onclick="toggleGruppo('${uid}')">
                <h4>📍 ${nome} <span class="gruppo-badge">${elementi.length}</span></h4>
                <span class="gruppo-icona">▼</span>
            </div>
            <div class="gruppo-viaggio-corpo" id="${uid}">
                ${elementi.map(function(item) {
                    return `<div class="alloggio-card">
                        <div>
                            <span class="tag-viaggio">📍 ${item.viaggioNome}</span>
                            <h4>${iconaTipo(item.tipo)} ${item.nome}</h4>
                            <p>📅 Check-in: ${formattaData(item.checkin)}</p>
                            <p>📅 Check-out: ${formattaData(item.checkout)}</p>
                            ${item.indirizzo ? `<p>📌 ${item.indirizzo}</p>` : ''}
                            ${item.riferimento ? `<p>🔖 ${item.riferimento}</p>` : ''}
                            ${item.note ? `<p>📝 ${item.note}</p>` : ''}
                            ${item.prezzo ? `<p class="prezzo-tag">💶 ${item.prezzo.toFixed(2).replace('.', ',')} €</p>` : ''}
                        </div>
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            <button class="btn-modifica" onclick="modificaAlloggio(${item.id})">${tr('btn_modifica')}</button>
                            <button class="btn-elimina" onclick="eliminaAlloggio(${item.id})">${tr('btn_elimina')}</button>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        `;
    }).join('');
}

// ============================================
// GESTIONE INTERESSI
// ============================================

function leggiInteressi() {
    const dati = localStorage.getItem('interessi');
    return dati ? JSON.parse(dati) : [];
}

function salvaInteressi(lista) {
    localStorage.setItem('interessi', JSON.stringify(lista));
}

function aggiungiInteresse() {
    const viaggioId = document.getElementById('interesse-viaggio').value;
    const nome = document.getElementById('interesse-nome').value.trim();
    const tipo = document.getElementById('interesse-tipo').value;
    const priorita = document.getElementById('interesse-priorita').value;
    const citta = document.getElementById('interesse-citta').value.trim();
    const indirizzo = document.getElementById('interesse-indirizzo').value.trim();
    const note = document.getElementById('interesse-note').value.trim();
    const prezzo = parseFloat(document.getElementById('interesse-prezzo').value) || 0;

    if (!viaggioId || !nome) {
        alert('Seleziona il viaggio e inserisci il nome del luogo!');
        return;
    }

    const viaggi = leggiViaggi();
    const viaggioCollegato = viaggi.find(function(v) { return v.id === parseInt(viaggioId); });
    const lista = leggiInteressi();

    if (interesseInModifica !== null) {
        const aggiornata = lista.map(function(item) {
            if (item.id === interesseInModifica) {
                return { ...item, viaggioId: parseInt(viaggioId),
                    viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : '—',
                    nome, tipo, priorita, citta, indirizzo, note, prezzo };
            }
            return item;
        });
        salvaInteressi(aggiornata);
        interesseInModifica = null;
        document.querySelector('#interessi .btn-aggiungi').textContent = tr('btn_aggiungi_interesse');
    } else {
        lista.push({
            id: Date.now(), viaggioId: parseInt(viaggioId),
            viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : '—',
            nome, tipo, priorita, citta, indirizzo, note, prezzo, visitato: false
        });
        salvaInteressi(lista);
    }

    document.getElementById('interesse-nome').value = '';
    document.getElementById('interesse-citta').value = '';
    document.getElementById('interesse-indirizzo').value = '';
    document.getElementById('interesse-note').value = '';
    document.getElementById('interesse-prezzo').value = '';
    chiudiAccordion('form-interessi');

    mostraListaInteressi();
    if (viaggioSelezionatoId === parseInt(viaggioId)) caricaSchedaInteressi(parseInt(viaggioId));
}

function modificaInteresse(id) {
    const lista = leggiInteressi();
    const item = lista.find(function(item) { return item.id === id; });
    if (!item) return;

    mostraVista('vista-inserimento');
    mostraSezione('interessi');

    document.getElementById('interesse-viaggio').value = item.viaggioId;
    document.getElementById('interesse-nome').value = item.nome;
    document.getElementById('interesse-tipo').value = item.tipo;
    document.getElementById('interesse-priorita').value = item.priorita;
    document.getElementById('interesse-citta').value = item.citta || '';
    document.getElementById('interesse-indirizzo').value = item.indirizzo || '';
    document.getElementById('interesse-note').value = item.note || '';
    document.getElementById('interesse-prezzo').value = item.prezzo || '';

    interesseInModifica = id;
    document.querySelector('#interessi .btn-aggiungi').textContent = tr('salva_modifiche');
    apriAccordion('form-interessi');
    document.getElementById('interesse-nome').scrollIntoView({ behavior: 'smooth' });
}

function eliminaInteresse(id) {
    const lista = leggiInteressi();
    salvaInteressi(lista.filter(function(item) { return item.id !== id; }));
    mostraListaInteressi();
    if (viaggioSelezionatoId) caricaSchedaInteressi(viaggioSelezionatoId);
}

function toggleVisitato(id) {
    const lista = leggiInteressi();
    const aggiornata = lista.map(function(item) {
        if (item.id === id) item.visitato = !item.visitato;
        return item;
    });
    salvaInteressi(aggiornata);
    mostraListaInteressi();
    if (viaggioSelezionatoId) caricaSchedaInteressi(viaggioSelezionatoId);
}

function iconaInteresse(tipo) {
    const icone = { posto: '👁️', ristorante: '🍽️', bar: '🍺', attivita: '🎯', altro: '🔹' };
    return icone[tipo] || '🔹';
}

function mostraListaInteressi() {
    const lista = leggiInteressi();
    const contenitore = document.getElementById('lista-interessi');
    if (lista.length === 0) {
        contenitore.innerHTML = `<p style="color:#999;">${tr('vuoto_interessi')}</p>`;
        return;
    }

    const viaggi = leggiViaggi();
    const gruppi = {};
    const ordine = { alta: 1, media: 2, bassa: 3 };
    [...lista].sort(function(a, b) { return ordine[a.priorita] - ordine[b.priorita]; })
        .forEach(function(item) {
            const key = item.viaggioId || 'nessuno';
            if (!gruppi[key]) gruppi[key] = [];
            gruppi[key].push(item);
        });

    contenitore.innerHTML = Object.keys(gruppi).map(function(key) {
        const nome = key === 'nessuno' ? '—' :
            (viaggi.find(function(v) { return v.id === parseInt(key); }) || {}).destinazione || '—';
        const elementi = gruppi[key];
        const uid = 'gt-interessi-' + key;
        return `
            <div class="gruppo-viaggio-header" onclick="toggleGruppo('${uid}')">
                <h4>📍 ${nome} <span class="gruppo-badge">${elementi.length}</span></h4>
                <span class="gruppo-icona">▼</span>
            </div>
            <div class="gruppo-viaggio-corpo" id="${uid}">
                ${elementi.map(function(item) {
                    return `<div class="interesse-card" style="${item.visitato ? 'opacity:0.5;' : ''}">
                        <div>
                            <span class="tag-viaggio">📍 ${item.viaggioNome}</span>
                            ${item.citta ? `<span class="tag-citta">🏙️ ${item.citta}</span>` : ''}
                            <span class="tag-priorita priorita-${item.priorita}">
                                ${item.priorita === 'alta' ? '🔴 Alta' : item.priorita === 'media' ? '🟡 Media' : '🟢 Bassa'}
                            </span>
                            <h4>${iconaInteresse(item.tipo)} ${item.nome}</h4>
                            ${item.indirizzo ? `<p>📌 ${item.indirizzo}</p>` : ''}
                            ${item.note ? `<p>📝 ${item.note}</p>` : ''}
                            ${item.prezzo ? `<p class="prezzo-tag">💶 ${item.prezzo.toFixed(2).replace('.', ',')} €</p>` : ''}
                        </div>
                        <div style="display:flex; flex-direction:column; gap:6px;">
                            <button class="btn-modifica" onclick="modificaInteresse(${item.id})">${tr('btn_modifica')}</button>
                            <button class="btn-elimina" onclick="eliminaInteresse(${item.id})">${tr('btn_elimina')}</button>
                            <button class="btn-visitato" onclick="toggleVisitato(${item.id})">
                                ${item.visitato ? tr('btn_riapri') : tr('btn_visitato')}
                            </button>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        `;
    }).join('');
}

// ============================================
// SUGGERIMENTI CITTÀ
// ============================================

function aggiornaSuggerimentiCitta() {
    const interessi = leggiInteressi();
    const citta = [...new Set(
        interessi.map(function(item) { return item.citta; }).filter(Boolean)
    )].sort();

    const datalist = document.getElementById('citta-suggerimenti');
    if (!datalist) return;

    datalist.innerHTML = citta.map(function(c) {
        return `<option value="${c}">`;
    }).join('');
}

// ============================================
// GESTIONE NOTE
// ============================================

function leggiNote() {
    const dati = localStorage.getItem('note');
    return dati ? JSON.parse(dati) : [];
}

function salvaNote(lista) {
    localStorage.setItem('note', JSON.stringify(lista));
}

function aggiungiNota() {
    const viaggioId = document.getElementById('nota-viaggio').value;
    const titolo = document.getElementById('nota-titolo').value.trim();
    const testo = document.getElementById('nota-testo').value.trim();

    if (!titolo || !testo) {
        alert('Inserisci titolo e testo della nota!');
        return;
    }

    const viaggi = leggiViaggi();
    const viaggioCollegato = viaggi.find(function(v) { return v.id === parseInt(viaggioId); });
    const lista = leggiNote();

    const ora = new Date().toLocaleString('it-IT', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    if (notaInModifica !== null) {
        const aggiornata = lista.map(function(item) {
            if (item.id === notaInModifica) {
                return { ...item,
                    viaggioId: viaggioId ? parseInt(viaggioId) : null,
                    viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : null,
                    titolo, testo };
            }
            return item;
        });
        salvaNote(aggiornata);
        notaInModifica = null;
        document.querySelector('#note .btn-aggiungi').textContent = tr('btn_aggiungi_nota');
    } else {
        lista.push({
            id: Date.now(),
            viaggioId: viaggioId ? parseInt(viaggioId) : null,
            viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : null,
            titolo, testo, data: ora
        });
        salvaNote(lista);
    }

    document.getElementById('nota-titolo').value = '';
    document.getElementById('nota-testo').value = '';
    chiudiAccordion('form-note');

    mostraListaNote();
    if (viaggioSelezionatoId && viaggioSelezionatoId === parseInt(viaggioId)) caricaSchedaNote(parseInt(viaggioId));
}

function modificaNota(id) {
    const lista = leggiNote();
    const item = lista.find(function(item) { return item.id === id; });
    if (!item) return;

    mostraVista('vista-inserimento');
    mostraSezione('note');

    document.getElementById('nota-viaggio').value = item.viaggioId || '';
    document.getElementById('nota-titolo').value = item.titolo;
    document.getElementById('nota-testo').value = item.testo;

    notaInModifica = id;
    document.querySelector('#note .btn-aggiungi').textContent = tr('salva_modifiche');
    apriAccordion('form-note');
    document.getElementById('nota-titolo').scrollIntoView({ behavior: 'smooth' });
}

function eliminaNota(id) {
    const lista = leggiNote();
    salvaNote(lista.filter(function(item) { return item.id !== id; }));
    mostraListaNote();
    if (viaggioSelezionatoId) caricaSchedaNote(viaggioSelezionatoId);
}

function mostraListaNote() {
    const lista = leggiNote();
    const contenitore = document.getElementById('lista-note');
    if (lista.length === 0) {
        contenitore.innerHTML = `<p style="color:#999;">${tr('vuoto_note')}</p>`;
        return;
    }

    const viaggi = leggiViaggi();
    const gruppi = {};
    [...lista].reverse().forEach(function(item) {
        const key = item.viaggioId || 'nessuno';
        if (!gruppi[key]) gruppi[key] = [];
        gruppi[key].push(item);
    });

    contenitore.innerHTML = Object.keys(gruppi).map(function(key) {
        const nome = key === 'nessuno' ? '—' :
            (viaggi.find(function(v) { return v.id === parseInt(key); }) || {}).destinazione || '—';
        const elementi = gruppi[key];
        const uid = 'gt-note-' + key;
        return `
            <div class="gruppo-viaggio-header" onclick="toggleGruppo('${uid}')">
                <h4>📍 ${nome} <span class="gruppo-badge">${elementi.length}</span></h4>
                <span class="gruppo-icona">▼</span>
            </div>
            <div class="gruppo-viaggio-corpo" id="${uid}">
                ${elementi.map(function(item) {
                    return `<div class="nota-card">
                        <div style="flex:1;">
                            <h4>📝 ${item.titolo}</h4>
                            <div class="nota-testo">${item.testo}</div>
                            <div class="nota-data">🕐 ${tr('nota_creata')} ${item.data}</div>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:6px; margin-left:12px;">
                            <button class="btn-modifica" onclick="modificaNota(${item.id})">${tr('btn_modifica')}</button>
                            <button class="btn-elimina" onclick="eliminaNota(${item.id})">${tr('btn_elimina')}</button>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        `;
    }).join('');
}

// ============================================
// NAVIGAZIONE MOBILE
// ============================================

function aggiornaSeletttoreMobile() {
    const lista = leggiViaggi();
    const select = document.getElementById('select-viaggio-mobile');
    if (!select) return;

    select.innerHTML = `<option value="">${tr('seleziona_viaggio')}</option>`;
    lista.forEach(function(v) {
        const opzione = document.createElement('option');
        opzione.value = v.id;
        opzione.textContent = '📍 ' + v.destinazione;
        if (v.id === viaggioSelezionatoId) opzione.selected = true;
        select.appendChild(opzione);
    });
}

function selezionaViaggioDaMenu() {
    const select = document.getElementById('select-viaggio-mobile');
    const id = parseInt(select.value);
    if (id) apriViaggio(id);
}

// ============================================
// ALLEGATI
// ============================================

function anteprimaAllegato(tipo) {
    const input = document.getElementById(tipo + '-allegato');
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        allegatiTemp[tipo] = {
            nome: file.name,
            tipo: file.type,
            dati: e.target.result
        };
        document.getElementById(tipo + '-allegato-nome').textContent = '📄 ' + file.name;
        document.getElementById(tipo + '-allegato-rimuovi').style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
}

function rimuoviAllegato(tipo) {
    allegatiTemp[tipo] = null;
    document.getElementById(tipo + '-allegato').value = '';
    document.getElementById(tipo + '-allegato-nome').textContent = '';
    document.getElementById(tipo + '-allegato-rimuovi').style.display = 'none';
}

function resetAllegato(tipo) {
    rimuoviAllegato(tipo);
}

function apriAllegato(dati, nome, tipoFile) {
    const modale = document.getElementById('modale-allegato');
    const titolo = document.getElementById('modale-allegato-titolo');
    const corpo = document.getElementById('modale-allegato-corpo');

    titolo.textContent = '📎 ' + nome;

    if (tipoFile && tipoFile.startsWith('image/')) {
        corpo.innerHTML = `<img src="${dati}" style="max-width:100%; max-height:70vh; border-radius:8px;">`;
    } else {
        corpo.innerHTML = `<iframe src="${dati}" style="width:100%; height:70vh; border:none; border-radius:8px;"></iframe>`;
    }

    modale.style.display = 'flex';
    document.getElementById('modale-allegato-dati').value = dati;
    document.getElementById('modale-allegato-nome').value = nome;
}

function chiudiModale() {
    document.getElementById('modale-allegato').style.display = 'none';
    document.getElementById('modale-allegato-corpo').innerHTML = '';
}

function scaricaAllegato() {
    const dati = document.getElementById('modale-allegato-dati').value;
    const nome = document.getElementById('modale-allegato-nome').value;
    const link = document.createElement('a');
    link.href = dati;
    link.download = nome;
    link.click();
}

// ============================================
// MAPPA INTERATTIVA
// ============================================

async function geocodifica(indirizzo) {
    if (!indirizzo) return null;
    try {
        const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' +
            encodeURIComponent(indirizzo) + '&limit=1';
        const risposta = await fetch(url, { headers: { 'Accept-Language': 'it' } });
        const dati = await risposta.json();
        if (dati && dati.length > 0) {
            return { lat: parseFloat(dati[0].lat), lng: parseFloat(dati[0].lon) };
        }
    } catch (e) {
        console.log('Geocoding fallito per:', indirizzo);
    }
    return null;
}

function creaIcona(colore, emoji) {
    return L.divIcon({
        html: `<div style="background-color:${colore};width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);font-size:14px;">${emoji}</span></div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
}

async function caricaMappa(viaggioId) {
    const contenitore = document.getElementById('mappa');
    const legenda = document.getElementById('mappa-legenda');

    contenitore.innerHTML = `<div class="mappa-caricamento">${tr('mappa_caricamento')}</div>`;
    legenda.innerHTML = '';

    if (mappaIstanza) {
        mappaIstanza.remove();
        mappaIstanza = null;
    }

    contenitore.innerHTML = '';
    contenitore.style.height = '450px';

    mappaIstanza = L.map('mappa').setView([45, 12], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mappaIstanza);

    const markers = [];
    const voci = [];

    const alloggi = leggiAlloggi().filter(function(item) { return item.viaggioId === viaggioId; });
    for (const a of alloggi) {
        if (a.indirizzo) {
            const coords = await geocodifica(a.indirizzo);
            if (coords) {
                const marker = L.marker([coords.lat, coords.lng], { icon: creaIcona('#2c7be5', '🏨') }).addTo(mappaIstanza);
                marker.bindPopup(`<strong>${a.nome}</strong><br>${a.indirizzo}`);
                markers.push([coords.lat, coords.lng]);
                voci.push({ colore: '#2c7be5', testo: a.nome, tipo: tr('scheda_alloggi') });
            }
        }
    }

    const interessi = leggiInteressi().filter(function(item) { return item.viaggioId === viaggioId; });
    const coloriInteresse = { alta: '#cc0000', media: '#996600', bassa: '#006600' };
    for (const i of interessi) {
        if (i.indirizzo) {
            const coords = await geocodifica(i.indirizzo);
            if (coords) {
                const colore = coloriInteresse[i.priorita] || '#555';
                const marker = L.marker([coords.lat, coords.lng], { icon: creaIcona(colore, iconaInteresse(i.tipo)) }).addTo(mappaIstanza);
                marker.bindPopup(`<strong>${i.nome}</strong><br>${i.indirizzo}`);
                markers.push([coords.lat, coords.lng]);
                voci.push({ colore: colore, testo: i.nome, tipo: tr('scheda_interessi') });
            }
        }
    }

    const trasporti = leggiTrasporti().filter(function(item) { return item.viaggioId === viaggioId; });
    for (const t of trasporti) {
        const coordsDa = await geocodifica(t.da);
        const coordsA = await geocodifica(t.a);
        if (coordsDa && coordsA) {
            L.polyline([[coordsDa.lat, coordsDa.lng], [coordsA.lat, coordsA.lng]],
                { color: '#ff6600', weight: 2, dashArray: '6, 8', opacity: 0.8 }
            ).addTo(mappaIstanza).bindPopup(`${iconaMezzo(t.mezzo)} ${t.da} → ${t.a}`);

            L.marker([coordsDa.lat, coordsDa.lng], { icon: creaIcona('#ff6600', iconaMezzo(t.mezzo)) })
                .addTo(mappaIstanza).bindPopup(`${tr('mappa_partenza')}: ${t.da}`);
            L.marker([coordsA.lat, coordsA.lng], { icon: creaIcona('#ff6600', iconaMezzo(t.mezzo)) })
                .addTo(mappaIstanza).bindPopup(`${tr('mappa_arrivo')}: ${t.a}`);

            markers.push([coordsDa.lat, coordsDa.lng]);
            markers.push([coordsA.lat, coordsA.lng]);
            voci.push({ colore: '#ff6600', testo: `${t.da} → ${t.a}`, tipo: tr('scheda_trasporti') });
        }
    }

    if (markers.length > 0) {
        mappaIstanza.fitBounds(markers, { padding: [40, 40] });
    }

    if (voci.length > 0) {
        legenda.innerHTML = `<h4>${tr('mappa_legenda')}</h4>` +
            voci.map(function(v) {
                return `<div class="legenda-voce">
                    <div class="legenda-dot" style="background-color:${v.colore};"></div>
                    <span><strong>${v.tipo}:</strong> ${v.testo}</span>
                </div>`;
            }).join('');
    } else {
        legenda.innerHTML = `<p style="color:#999; font-size:13px;">${tr('mappa_nessun_elemento')}</p>`;
    }
}

// ============================================
// BACKUP
// ============================================

function esportaDati() {
    const backup = {
        versione: '1.0',
        data: new Date().toLocaleString('it-IT'),
        viaggi: leggiViaggi(),
        trasporti: leggiTrasporti(),
        alloggi: leggiAlloggi(),
        interessi: leggiInteressi(),
        note: leggiNote()
    };

    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dataOggi = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = 'backup-viaggi-' + dataOggi + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('✅ Backup esportato con successo!');
}

function importaDati(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!confirm('⚠️ Importando il backup, i dati attuali verranno sostituiti. Continuare?')) {
        event.target.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backup = JSON.parse(e.target.result);
            if (!backup.viaggi || !backup.trasporti) {
                alert('❌ File non valido.');
                return;
            }
            salvaViaggi(backup.viaggi || []);
            salvaTrasporti(backup.trasporti || []);
            salvaAlloggi(backup.alloggi || []);
            salvaInteressi(backup.interessi || []);
            salvaNote(backup.note || []);

            viaggioSelezionatoId = null;
            mostraListaViaggi();
            mostraListaTrasporti();
            mostraListaAlloggi();
            mostraListaInteressi();
            mostraListaNote();
            aggiornaSidebar();

            alert('✅ Backup importato con successo!');
            mostraVista('vista-viaggi');
        } catch (errore) {
            alert('❌ Errore nella lettura del file.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ============================================
// CANCELLA TUTTI I DATI
// ============================================

function cancellaTuttiDati() {
    document.getElementById('modale-cancella-dati').style.display = 'flex';
}

function confermaCancellaDati() {
    localStorage.removeItem('viaggi');
    localStorage.removeItem('trasporti');
    localStorage.removeItem('alloggi');
    localStorage.removeItem('interessi');
    localStorage.removeItem('note');

    viaggioSelezionatoId = null;
    document.getElementById('schermata-benvenuto').style.display = 'block';
    document.getElementById('dettaglio-viaggio').style.display = 'none';

    mostraListaViaggi();
    mostraListaTrasporti();
    mostraListaAlloggi();
    mostraListaInteressi();
    mostraListaNote();
    aggiornaSidebar();
    chiudiModaleCancellaDati();
    mostraVista('vista-viaggi');
}

function chiudiModaleCancellaDati() {
    document.getElementById('modale-cancella-dati').style.display = 'none';
}
// ============================================
// TORNA AL BENVENUTO
// ============================================

function tornaAlBenvenuto() {
    viaggioSelezionatoId = null;
    mostraVista('vista-viaggi');
    document.getElementById('schermata-benvenuto').style.display = 'block';
    document.getElementById('dettaglio-viaggio').style.display = 'none';
    aggiornaSidebar();
}
// ============================================
// ACCORDION
// ============================================

function toggleAccordion(id) {
    const corpo = document.getElementById(id);
    const header = corpo.previousElementSibling;

    const staAperto = corpo.classList.contains('aperto');

    corpo.classList.toggle('aperto', !staAperto);
    header.classList.toggle('aperto', !staAperto);
}

function apriAccordion(id) {
    const corpo = document.getElementById(id);
    const header = corpo.previousElementSibling;
    corpo.classList.add('aperto');
    header.classList.add('aperto');
}

function chiudiAccordion(id) {
    const corpo = document.getElementById(id);
    const header = corpo.previousElementSibling;
    corpo.classList.remove('aperto');
    header.classList.remove('aperto');
}

function toggleGruppo(id) {
    const corpo = document.getElementById(id);
    const header = corpo.previousElementSibling;
    const staAperto = corpo.classList.contains('aperto');
    corpo.classList.toggle('aperto', !staAperto);
    header.classList.toggle('aperto', !staAperto);
}

// ============================================
// AVVIO
// ============================================

mostraVista('vista-viaggi');
mostraListaViaggi();
mostraListaTrasporti();
mostraListaAlloggi();
mostraListaInteressi();
mostraListaNote();
applicaDarkMode();
caricaLingua();