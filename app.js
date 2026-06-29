// ============================================
// VARIABILI DI STATO
// ============================================

let viaggioSelezionatoId = null;

// Tengono traccia se stiamo modificando un record esistente
let viaggioInModifica = null;
let trasportoInModifica = null;
let alloggioInModifica = null;
let interesseInModifica = null;
let notaInModifica = null;

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
        // Aggiorna anche il selettore mobile
        aggiornaSeletttoreMobile();
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
// SIDEBAR E DETTAGLIO VIAGGIO
// ============================================

function aggiornaSidebar() {
    const lista = leggiViaggi();
    const contenitore = document.getElementById('sidebar-lista');

    if (lista.length === 0) {
        contenitore.innerHTML = '<p style="color:#bbb; font-size:13px;">Nessun viaggio ancora.<br>Vai su <strong>Inserisci Dati</strong> per aggiungerne uno.</p>';
        return;
    }

    contenitore.innerHTML = lista.map(function(v) {
        const selezionato = v.id === viaggioSelezionatoId ? 'selezionato' : '';

        // Calcola lo stato del viaggio in base alle date
        let stato = '';
        let statoClasse = '';
        if (v.partenza && v.ritorno) {
            const oggi = new Date();
            oggi.setHours(0,0,0,0);
            const p = new Date(v.partenza);
            const r = new Date(v.ritorno);
            if (oggi < p) { stato = '🔵 Prossimo'; statoClasse = 'stato-prossimo'; }
            else if (oggi > r) { stato = '✅ Passato'; statoClasse = 'stato-passato'; }
            else { stato = '🟢 In corso'; statoClasse = 'stato-in-corso'; }
        }

        return `
            <div class="sidebar-card ${selezionato}" onclick="apriViaggio(${v.id})">
                <h4>📍 ${v.destinazione}</h4>
                <p>${v.partenza || '—'} → ${v.ritorno || '—'}</p>
                ${stato ? `<span class="stato-tag ${statoClasse}">${stato}</span>` : ''}
            </div>
        `;
    }).join('');
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
            🗑️ Elimina viaggio
        </button>`;

    let giorni = '—';
    if (viaggio.partenza && viaggio.ritorno) {
        const p = new Date(viaggio.partenza);
        const r = new Date(viaggio.ritorno);
        const diff = Math.round((r - p) / (1000 * 60 * 60 * 24));
        giorni = diff + (diff === 1 ? ' giorno' : ' giorni');
    }

    document.getElementById('dettaglio-riepilogo').innerHTML = `
        <div class="riepilogo-griglia">
            <div class="riepilogo-item">
                <div class="etichetta">📅 Partenza</div>
                <div class="valore">${formattaDataBreve(viaggio.partenza)}</div>
            </div>
            <div class="riepilogo-item">
                <div class="etichetta">📅 Ritorno</div>
                <div class="valore">${formattaDataBreve(viaggio.ritorno)}</div>
            </div>
            <div class="riepilogo-item">
                <div class="etichetta">⏱️ Durata</div>
                <div class="valore">${giorni}</div>
            </div>
            <div class="riepilogo-item">
                <div class="etichetta">📝 Note</div>
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
// SCHEDE DETTAGLIO — CONTENUTO FILTRATO
// ============================================

function caricaSchedaTrasporti(viaggioId) {
    const tutti = leggiTrasporti();
    const filtrati = tutti.filter(function(t) { return t.viaggioId === viaggioId; });
    const contenitore = document.getElementById('scheda-trasporti');

    if (filtrati.length === 0) {
        contenitore.innerHTML = '<p style="color:#999;">Nessun trasporto per questo viaggio.</p>';
        return;
    }

    contenitore.innerHTML = filtrati.map(function(t) {
        return `
            <div class="trasporto-card">
                <div>
                    <h4>${iconaMezzo(t.mezzo)} ${t.da} → ${t.a}</h4>
                    <p>🕐 Partenza: ${formattaData(t.dataPartenza)}</p>
                    <p>🕐 Arrivo: ${formattaData(t.dataArrivo)}</p>
                    ${t.riferimento ? `<p>🔖 ${t.riferimento}</p>` : ''}
                    ${t.prezzo ? `<p class="prezzo-tag">💶 ${t.prezzo.toFixed(2).replace('.', ',')} €</p>` : ''}
                    ${t.allegato ? `<p class="allegato-tag" onclick="apriAllegato('${t.allegato.dati}', '${t.allegato.nome}', '${t.allegato.tipo}')">📎 ${t.allegato.nome}</p>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaTrasporto(${t.id})">✏️</button>
                    <button class="btn-elimina" onclick="eliminaTrasporto(${t.id})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

function caricaSchedaAlloggi(viaggioId) {
    const tutti = leggiAlloggi();
    const filtrati = tutti.filter(function(a) { return a.viaggioId === viaggioId; });
    const contenitore = document.getElementById('scheda-alloggi');

    if (filtrati.length === 0) {
        contenitore.innerHTML = '<p style="color:#999;">Nessun alloggio per questo viaggio.</p>';
        return;
    }

    contenitore.innerHTML = filtrati.map(function(a) {
        return `
            <div class="alloggio-card">
                <div>
                    <h4>${iconaTipo(a.tipo)} ${a.nome}</h4>
                    <p>📅 Check-in: ${formattaData(a.checkin)}</p>
                    <p>📅 Check-out: ${formattaData(a.checkout)}</p>
                    ${a.indirizzo ? `<p>📌 ${a.indirizzo}</p>` : ''}
                    ${a.riferimento ? `<p>🔖 ${a.riferimento}</p>` : ''}
                    ${a.note ? `<p>📝 ${a.note}</p>` : ''}
                    ${a.prezzo ? `<p class="prezzo-tag">💶 ${a.prezzo.toFixed(2).replace('.', ',')} €</p>` : ''}
                    ${a.allegato ? `<p class="allegato-tag" onclick="apriAllegato('${a.allegato.dati}', '${a.allegato.nome}', '${a.allegato.tipo}')">📎 ${a.allegato.nome}</p>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaAlloggio(${a.id})">✏️</button>
                    <button class="btn-elimina" onclick="eliminaAlloggio(${a.id})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

function caricaSchedaInteressi(viaggioId, cittaFiltro) {
    const tutti = leggiInteressi();
    const filtrati = tutti.filter(function(i) { return i.viaggioId === viaggioId; });
    const contenitore = document.getElementById('scheda-interessi-lista');
    const filtroCont = document.getElementById('filtro-citta-contenitore');
    const filtroBottoni = document.getElementById('filtro-citta-bottoni');

    if (filtrati.length === 0) {
        filtroCont.style.display = 'none';
        contenitore.innerHTML = '<p style="color:#999;">Nessun punto di interesse per questo viaggio.</p>';
        return;
    }

    // Raccogli le città uniche (escludendo vuote)
    const citta = [...new Set(
        filtrati.map(function(i) { return i.citta; }).filter(Boolean)
    )];

    // Mostra il filtro solo se ci sono più città
    if (citta.length > 1) {
        filtroCont.style.display = 'block';
        filtroBottoni.innerHTML =
            `<button class="filtro-btn ${!cittaFiltro ? 'attivo' : ''}"
                onclick="caricaSchedaInteressi(${viaggioId}, null)">
                Tutte
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

    // Applica il filtro città se selezionato
    const damostrare = cittaFiltro
        ? filtrati.filter(function(i) { return i.citta === cittaFiltro; })
        : filtrati;

    const ordine = { alta: 1, media: 2, bassa: 3 };
    const ordinati = [...damostrare].sort(function(a, b) {
        return ordine[a.priorita] - ordine[b.priorita];
    });

    contenitore.innerHTML = ordinati.map(function(i) {
        return `
            <div class="interesse-card" style="${i.visitato ? 'opacity:0.5;' : ''}">
                <div>
                    ${i.citta ? `<span class="tag-citta">🏙️ ${i.citta}</span>` : ''}
                    <span class="tag-priorita priorita-${i.priorita}">
                        ${i.priorita === 'alta' ? '🔴 Alta' : i.priorita === 'media' ? '🟡 Media' : '🟢 Bassa'}
                    </span>
                    <h4>${iconaInteresse(i.tipo)} ${i.nome}</h4>
                    ${i.indirizzo ? `<p>📌 ${i.indirizzo}</p>` : ''}
                    ${i.note ? `<p>📝 ${i.note}</p>` : ''}
                    ${i.prezzo ? `<p class="prezzo-tag">💶 ${i.prezzo.toFixed(2).replace('.', ',')} €</p>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaInteresse(${i.id})">✏️</button>
                    <button class="btn-elimina" onclick="eliminaInteresse(${i.id})">🗑️</button>
                    <button class="btn-visitato" onclick="toggleVisitato(${i.id})">
                        ${i.visitato ? '↩️' : '✅'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function caricaSchedaNote(viaggioId) {
    const tutte = leggiNote();
    const filtrate = tutte.filter(function(n) { return n.viaggioId === viaggioId; });
    const contenitore = document.getElementById('scheda-note');

    if (filtrate.length === 0) {
        contenitore.innerHTML = '<p style="color:#999;">Nessuna nota per questo viaggio.</p>';
        return;
    }

    contenitore.innerHTML = [...filtrate].reverse().map(function(n) {
        return `
            <div class="nota-card">
                <div style="flex:1;">
                    <h4>📝 ${n.titolo}</h4>
                    <div class="nota-testo">${n.testo}</div>
                    <div class="nota-data">🕐 ${n.data}</div>
                </div>
                <div style="display:flex; flex-direction:column; gap:6px; margin-left:12px;">
                    <button class="btn-modifica" onclick="modificaNota(${n.id})">✏️</button>
                    <button class="btn-elimina" onclick="eliminaNota(${n.id})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
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
        // Modalità modifica: aggiorna il record esistente
        const aggiornata = lista.map(function(v) {
            if (v.id === viaggioInModifica) {
                return { ...v, destinazione, partenza, ritorno, note };
            }
            return v;
        });
        salvaViaggi(aggiornata);
        viaggioInModifica = null;
        document.querySelector('#viaggi .btn-aggiungi').textContent = '+ Aggiungi Viaggio';
        // Se il viaggio modificato era quello aperto, ricarica il dettaglio
        if (viaggioSelezionatoId) apriViaggio(viaggioSelezionatoId);
    } else {
        // Modalità creazione: aggiungi nuovo record
        lista.push({ id: Date.now(), destinazione, partenza, ritorno, note });
        salvaViaggi(lista);
    }

    document.getElementById('viaggio-destinazione').value = '';
    document.getElementById('viaggio-partenza').value = '';
    document.getElementById('viaggio-ritorno').value = '';
    document.getElementById('viaggio-note').value = '';

    mostraListaViaggi();
    aggiornaSidebar();
}

function modificaViaggio(id) {
    const lista = leggiViaggi();
    const v = lista.find(function(v) { return v.id === id; });
    if (!v) return;

    // Vai alla sezione viaggi e riempi i campi
    mostraVista('vista-inserimento');
    mostraSezione('viaggi');

    document.getElementById('viaggio-destinazione').value = v.destinazione;
    document.getElementById('viaggio-partenza').value = v.partenza;
    document.getElementById('viaggio-ritorno').value = v.ritorno;
    document.getElementById('viaggio-note').value = v.note;

    viaggioInModifica = id;
    document.querySelector('#viaggi .btn-aggiungi').textContent = '💾 Salva Modifiche';

    // Scrolla in cima al form
    document.getElementById('viaggio-destinazione').scrollIntoView({ behavior: 'smooth' });
}

// Variabile temporanea che tiene l'id del viaggio in attesa di conferma
let viaggioInEliminazione = null;

function eliminaViaggio(id) {
    const viaggi = leggiViaggi();
    const viaggio = viaggi.find(function(v) { return v.id === id; });
    if (!viaggio) return;

    // Conta i dati collegati
    const nTrasporti = leggiTrasporti().filter(function(t) { return t.viaggioId === id; }).length;
    const nAlloggi = leggiAlloggi().filter(function(a) { return a.viaggioId === id; }).length;
    const nInteressi = leggiInteressi().filter(function(i) { return i.viaggioId === id; }).length;
    const nNote = leggiNote().filter(function(n) { return n.viaggioId === id; }).length;
    const totaleCollegati = nTrasporti + nAlloggi + nInteressi + nNote;

    // Salva l'id in attesa della scelta dell'utente
    viaggioInEliminazione = id;

    // Costruisce il messaggio
    let messaggio = `Stai per eliminare il viaggio <strong>${viaggio.destinazione}</strong>.`;

    if (totaleCollegati > 0) {
        messaggio += `<br><br>Sono presenti dati collegati:<br>`;
        if (nTrasporti > 0) messaggio += `• ${nTrasporti} trasporto/i<br>`;
        if (nAlloggi > 0) messaggio += `• ${nAlloggi} alloggio/i<br>`;
        if (nInteressi > 0) messaggio += `• ${nInteressi} punto/i di interesse<br>`;
        if (nNote > 0) messaggio += `• ${nNote} nota/e<br>`;
        messaggio += `<br>Come vuoi procedere?`;

        // Mostra tutti e tre i bottoni
        document.getElementById('modale-elimina-bottoni').innerHTML = `
            <button class="btn-modale-elimina-tutto" onclick="confermaEliminaViaggio('tutto')">
                🗑️ Elimina viaggio e tutti i dati collegati
            </button>
            <button class="btn-modale-elimina-solo" onclick="confermaEliminaViaggio('solo')">
                ✂️ Elimina solo il viaggio, mantieni i dati
            </button>
            <button class="btn-modale-annulla" onclick="chiudiModaleEliminaViaggio()">
                ↩️ Annulla
            </button>
        `;
    } else {
        messaggio += `<br><br>Non ci sono dati collegati. Vuoi procedere?`;

        // Nessun dato collegato — mostra solo Elimina e Annulla
        document.getElementById('modale-elimina-bottoni').innerHTML = `
            <button class="btn-modale-elimina-tutto" onclick="confermaEliminaViaggio('tutto')">
                🗑️ Elimina viaggio
            </button>
            <button class="btn-modale-annulla" onclick="chiudiModaleEliminaViaggio()">
                ↩️ Annulla
            </button>
        `;
    }

    document.getElementById('modale-elimina-messaggio').innerHTML = messaggio;
    document.getElementById('modale-elimina-viaggio').style.display = 'flex';
}

function confermaEliminaViaggio(modalita) {
    const id = viaggioInEliminazione;
    if (!id) return;

    // Elimina sempre il viaggio
    salvaViaggi(leggiViaggi().filter(function(v) { return v.id !== id; }));

    // Se scelto, elimina anche i dati collegati
    if (modalita === 'tutto') {
        salvaTrasporti(leggiTrasporti().filter(function(t) { return t.viaggioId !== id; }));
        salvaAlloggi(leggiAlloggi().filter(function(a) { return a.viaggioId !== id; }));
        salvaInteressi(leggiInteressi().filter(function(i) { return i.viaggioId !== id; }));
        salvaNote(leggiNote().filter(function(n) { return n.viaggioId !== id; }));
    }

    // Aggiorna l'interfaccia
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
        contenitore.innerHTML = '<p style="color:#999;">Nessun viaggio salvato ancora.</p>';
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
                    <button class="btn-modifica" onclick="modificaViaggio(${v.id})">✏️ Modifica</button>
                    <button class="btn-elimina" onclick="eliminaViaggio(${v.id})">🗑️ Elimina</button>
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
    select.innerHTML = '<option value="">-- Seleziona un viaggio --</option>';
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
        const aggiornata = lista.map(function(t) {
            if (t.id === trasportoInModifica) {
                return { ...t, viaggioId: parseInt(viaggioId),
                    viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : '—',
                    mezzo, da, a, dataPartenza, dataArrivo, riferimento, prezzo,
                    allegato: allegatiTemp.trasporto !== null ? allegatiTemp.trasporto : t.allegato };
            }
            return t;
        });
        salvaTrasporti(aggiornata);
        trasportoInModifica = null;
        document.querySelector('#trasporti .btn-aggiungi').textContent = '+ Aggiungi Trasporto';
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

    mostraListaTrasporti();
    if (viaggioSelezionatoId) caricaSchedaTrasporti(viaggioSelezionatoId);
}

function modificaTrasporto(id) {
    const lista = leggiTrasporti();
    const t = lista.find(function(t) { return t.id === id; });
    if (!t) return;

    mostraVista('vista-inserimento');
    mostraSezione('trasporti');

    document.getElementById('trasporto-viaggio').value = t.viaggioId;
    document.getElementById('trasporto-mezzo').value = t.mezzo;
    document.getElementById('trasporto-da').value = t.da;
    document.getElementById('trasporto-a').value = t.a;
    document.getElementById('trasporto-data-partenza').value = t.dataPartenza;
    document.getElementById('trasporto-data-arrivo').value = t.dataArrivo;
    document.getElementById('trasporto-riferimento').value = t.riferimento;
    document.getElementById('trasporto-prezzo').value = t.prezzo || '';

    // Mostra il nome dell'allegato esistente se presente
    if (t.allegato) {
        allegatiTemp.trasporto = t.allegato;
        document.getElementById('trasporto-allegato-nome').textContent = '📄 ' + t.allegato.nome;
        document.getElementById('trasporto-allegato-rimuovi').style.display = 'inline-block';
    } else {
        resetAllegato('trasporto');
    }

    trasportoInModifica = id;
    document.querySelector('#trasporti .btn-aggiungi').textContent = '💾 Salva Modifiche';
    document.getElementById('trasporto-da').scrollIntoView({ behavior: 'smooth' });
}

function eliminaTrasporto(id) {
    const lista = leggiTrasporti();
    salvaTrasporti(lista.filter(function(t) { return t.id !== id; }));
    mostraListaTrasporti();
    if (viaggioSelezionatoId) caricaSchedaTrasporti(viaggioSelezionatoId);
}

function iconaMezzo(mezzo) {
    const icone = { aereo:'✈️', treno:'🚂', auto:'🚗', autobus:'🚌', nave:'🚢', altro:'🔹' };
    return icone[mezzo] || '🔹';
}

function mostraListaTrasporti() {
    const lista = leggiTrasporti();
    const contenitore = document.getElementById('lista-trasporti');
    if (lista.length === 0) {
        contenitore.innerHTML = '<p style="color:#999;">Nessun trasporto salvato ancora.</p>';
        return;
    }
    contenitore.innerHTML = lista.map(function(t) {
        return `
            <div class="trasporto-card">
                <div>
                    <span class="tag-viaggio">📍 ${t.viaggioNome}</span>
                    <h4>${iconaMezzo(t.mezzo)} ${t.da} → ${t.a}</h4>
                    <p>🕐 Partenza: ${formattaData(t.dataPartenza)}</p>
                    <p>🕐 Arrivo: ${formattaData(t.dataArrivo)}</p>
                    ${t.riferimento ? `<p>🔖 ${t.riferimento}</p>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaTrasporto(${t.id})">✏️ Modifica</button>
                    <button class="btn-elimina" onclick="eliminaTrasporto(${t.id})">🗑️ Elimina</button>
                </div>
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
        const aggiornata = lista.map(function(a) {
            if (a.id === alloggioInModifica) {
                return { ...a, viaggioId: parseInt(viaggioId),
                    viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : '—',
                    nome, tipo, checkin, checkout, indirizzo, riferimento, note, prezzo,
                    allegato: allegatiTemp.alloggio !== null ? allegatiTemp.alloggio : a.allegato };
            }
            return a;
        });
        salvaAlloggi(aggiornata);
        alloggioInModifica = null;
        document.querySelector('#alloggi .btn-aggiungi').textContent = '+ Aggiungi Alloggio';
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

    mostraListaAlloggi();
    if (viaggioSelezionatoId) caricaSchedaAlloggi(viaggioSelezionatoId);
}

function modificaAlloggio(id) {
    const lista = leggiAlloggi();
    const a = lista.find(function(a) { return a.id === id; });
    if (!a) return;

    mostraVista('vista-inserimento');
    mostraSezione('alloggi');

    document.getElementById('alloggio-viaggio').value = a.viaggioId;
    document.getElementById('alloggio-nome').value = a.nome;
    document.getElementById('alloggio-tipo').value = a.tipo;
    document.getElementById('alloggio-checkin').value = a.checkin;
    document.getElementById('alloggio-checkout').value = a.checkout;
    document.getElementById('alloggio-indirizzo').value = a.indirizzo;
    document.getElementById('alloggio-riferimento').value = a.riferimento;
    document.getElementById('alloggio-note').value = a.note;
    document.getElementById('alloggio-prezzo').value = a.prezzo || '';

    if (a.allegato) {
        allegatiTemp.alloggio = a.allegato;
        document.getElementById('alloggio-allegato-nome').textContent = '📄 ' + a.allegato.nome;
        document.getElementById('alloggio-allegato-rimuovi').style.display = 'inline-block';
    } else {
        resetAllegato('alloggio');
    }

    alloggioInModifica = id;
    document.querySelector('#alloggi .btn-aggiungi').textContent = '💾 Salva Modifiche';
    document.getElementById('alloggio-nome').scrollIntoView({ behavior: 'smooth' });
}

function eliminaAlloggio(id) {
    const lista = leggiAlloggi();
    salvaAlloggi(lista.filter(function(a) { return a.id !== id; }));
    mostraListaAlloggi();
    if (viaggioSelezionatoId) caricaSchedaAlloggi(viaggioSelezionatoId);
}

function iconaTipo(tipo) {
    const icone = { hotel:'🏨', bnb:'🏡', airbnb:'🛋️', ostello:'🛏️', appartamento:'🏠', altro:'🔹' };
    return icone[tipo] || '🔹';
}

function mostraListaAlloggi() {
    const lista = leggiAlloggi();
    const contenitore = document.getElementById('lista-alloggi');
    if (lista.length === 0) {
        contenitore.innerHTML = '<p style="color:#999;">Nessun alloggio salvato ancora.</p>';
        return;
    }
    contenitore.innerHTML = lista.map(function(a) {
        return `
            <div class="alloggio-card">
                <div>
                    <span class="tag-viaggio">📍 ${a.viaggioNome}</span>
                    <h4>${iconaTipo(a.tipo)} ${a.nome}</h4>
                    <p>📅 Check-in: ${formattaData(a.checkin)}</p>
                    <p>📅 Check-out: ${formattaData(a.checkout)}</p>
                    ${a.indirizzo ? `<p>📌 ${a.indirizzo}</p>` : ''}
                    ${a.riferimento ? `<p>🔖 ${a.riferimento}</p>` : ''}
                    ${a.note ? `<p>📝 ${a.note}</p>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaAlloggio(${a.id})">✏️ Modifica</button>
                    <button class="btn-elimina" onclick="eliminaAlloggio(${a.id})">🗑️ Elimina</button>
                </div>
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
        const aggiornata = lista.map(function(i) {
            if (i.id === interesseInModifica) {
                return { ...i, viaggioId: parseInt(viaggioId),
                    viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : '—',
                    nome, tipo, priorita, citta, indirizzo, note, prezzo };
            }
            return i;
        });
        salvaInteressi(aggiornata);
        interesseInModifica = null;
        document.querySelector('#interessi .btn-aggiungi').textContent = '+ Aggiungi Punto di Interesse';
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

    mostraListaInteressi();
    if (viaggioSelezionatoId) caricaSchedaInteressi(viaggioSelezionatoId);
}

function modificaInteresse(id) {
    const lista = leggiInteressi();
    const i = lista.find(function(i) { return i.id === id; });
    if (!i) return;

    mostraVista('vista-inserimento');
    mostraSezione('interessi');

    document.getElementById('interesse-viaggio').value = i.viaggioId;
    document.getElementById('interesse-nome').value = i.nome;
    document.getElementById('interesse-tipo').value = i.tipo;
    document.getElementById('interesse-priorita').value = i.priorita;
    document.getElementById('interesse-citta').value = i.citta || '';
    document.getElementById('interesse-indirizzo').value = i.indirizzo || '';
    document.getElementById('interesse-note').value = i.note || '';
    document.getElementById('interesse-prezzo').value = i.prezzo || '';

    interesseInModifica = id;
    document.querySelector('#interessi .btn-aggiungi').textContent = '💾 Salva Modifiche';
    document.getElementById('interesse-nome').scrollIntoView({ behavior: 'smooth' });
}

function eliminaInteresse(id) {
    const lista = leggiInteressi();
    salvaInteressi(lista.filter(function(i) { return i.id !== id; }));
    mostraListaInteressi();
    if (viaggioSelezionatoId) caricaSchedaInteressi(viaggioSelezionatoId);
}

function toggleVisitato(id) {
    const lista = leggiInteressi();
    const aggiornata = lista.map(function(i) {
        if (i.id === id) i.visitato = !i.visitato;
        return i;
    });
    salvaInteressi(aggiornata);
    mostraListaInteressi();
    if (viaggioSelezionatoId) caricaSchedaInteressi(viaggioSelezionatoId);
}

function iconaInteresse(tipo) {
    const icone = { posto:'👁️', ristorante:'🍽️', bar:'🍺', attivita:'🎯', altro:'🔹' };
    return icone[tipo] || '🔹';
}

function mostraListaInteressi() {
    const lista = leggiInteressi();
    const contenitore = document.getElementById('lista-interessi');
    if (lista.length === 0) {
        contenitore.innerHTML = '<p style="color:#999;">Nessun punto di interesse salvato ancora.</p>';
        return;
    }
    const ordine = { alta: 1, media: 2, bassa: 3 };
    const ordinata = [...lista].sort(function(a, b) { return ordine[a.priorita] - ordine[b.priorita]; });
    contenitore.innerHTML = ordinata.map(function(i) {
        return `
            <div class="interesse-card" style="${i.visitato ? 'opacity:0.5;' : ''}">
                <div>
                    <span class="tag-viaggio">📍 ${i.viaggioNome}</span>
                    ${i.citta ? `<span class="tag-citta">🏙️ ${i.citta}</span>` : ''}
                    <span class="tag-priorita priorita-${i.priorita}">
                        ${i.priorita === 'alta' ? '🔴 Alta' : i.priorita === 'media' ? '🟡 Media' : '🟢 Bassa'}
                    </span>
                    <h4>${iconaInteresse(i.tipo)} ${i.nome}</h4>
                    ${i.indirizzo ? `<p>📌 ${i.indirizzo}</p>` : ''}
                    ${i.note ? `<p>📝 ${i.note}</p>` : ''}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <button class="btn-modifica" onclick="modificaInteresse(${i.id})">✏️ Modifica</button>
                    <button class="btn-elimina" onclick="eliminaInteresse(${i.id})">🗑️ Elimina</button>
                    <button class="btn-visitato" onclick="toggleVisitato(${i.id})">
                        ${i.visitato ? '↩️ Riapri' : '✅ Visitato'}
                    </button>
                </div>
            </div>
        `;
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
        const aggiornata = lista.map(function(n) {
            if (n.id === notaInModifica) {
                return { ...n,
                    viaggioId: viaggioId ? parseInt(viaggioId) : null,
                    viaggioNome: viaggioCollegato ? viaggioCollegato.destinazione : null,
                    titolo, testo };
            }
            return n;
        });
        salvaNote(aggiornata);
        notaInModifica = null;
        document.querySelector('#note .btn-aggiungi').textContent = '+ Aggiungi Nota';
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

    mostraListaNote();
    if (viaggioSelezionatoId) caricaSchedaNote(viaggioSelezionatoId);
}

function modificaNota(id) {
    const lista = leggiNote();
    const n = lista.find(function(n) { return n.id === id; });
    if (!n) return;

    mostraVista('vista-inserimento');
    mostraSezione('note');

    document.getElementById('nota-viaggio').value = n.viaggioId || '';
    document.getElementById('nota-titolo').value = n.titolo;
    document.getElementById('nota-testo').value = n.testo;

    notaInModifica = id;
    document.querySelector('#note .btn-aggiungi').textContent = '💾 Salva Modifiche';
    document.getElementById('nota-titolo').scrollIntoView({ behavior: 'smooth' });
}

function eliminaNota(id) {
    const lista = leggiNote();
    salvaNote(lista.filter(function(n) { return n.id !== id; }));
    mostraListaNote();
    if (viaggioSelezionatoId) caricaSchedaNote(viaggioSelezionatoId);
}

function mostraListaNote() {
    const lista = leggiNote();
    const contenitore = document.getElementById('lista-note');
    if (lista.length === 0) {
        contenitore.innerHTML = '<p style="color:#999;">Nessuna nota salvata ancora.</p>';
        return;
    }
    contenitore.innerHTML = [...lista].reverse().map(function(n) {
        return `
            <div class="nota-card">
                <div style="flex:1;">
                    ${n.viaggioNome ? `<span class="tag-viaggio">📍 ${n.viaggioNome}</span>` : ''}
                    <h4>📝 ${n.titolo}</h4>
                    <div class="nota-testo">${n.testo}</div>
                    <div class="nota-data">🕐 Creata il ${n.data}</div>
                </div>
                <div style="display:flex; flex-direction:column; gap:6px; margin-left:12px;">
                    <button class="btn-modifica" onclick="modificaNota(${n.id})">✏️ Modifica</button>
                    <button class="btn-elimina" onclick="eliminaNota(${n.id})">🗑️ Elimina</button>
                </div>
            </div>
        `;
    }).join('');
}
// ============================================
// BACKUP — ESPORTA E IMPORTA
// ============================================

function esportaDati() {

    // Raccoglie tutti i dati dal localStorage
    const backup = {
        versione: '1.0',
        data: new Date().toLocaleString('it-IT'),
        viaggi: leggiViaggi(),
        trasporti: leggiTrasporti(),
        alloggi: leggiAlloggi(),
        interessi: leggiInteressi(),
        note: leggiNote()
    };

    // Converte i dati in testo JSON formattato
    const json = JSON.stringify(backup, null, 2);

    // Crea un file scaricabile nel browser
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Crea un link invisibile, lo clicca automaticamente e lo rimuove
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

    // Chiede conferma prima di sovrascrivere i dati esistenti
    if (!confirm('⚠️ Importando il backup, i dati attuali verranno sostituiti. Continuare?')) {
        event.target.value = '';
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const backup = JSON.parse(e.target.result);

            // Controlla che il file sia un backup valido
            if (!backup.viaggi || !backup.trasporti) {
                alert('❌ File non valido. Seleziona un file di backup corretto.');
                return;
            }

            // Ripristina tutti i dati nel localStorage
            salvaViaggi(backup.viaggi || []);
            salvaTrasporti(backup.trasporti || []);
            salvaAlloggi(backup.alloggi || []);
            salvaInteressi(backup.interessi || []);
            salvaNote(backup.note || []);

            // Reimposta lo stato dell'app
            viaggioSelezionatoId = null;

            // Ricarica tutte le liste
            mostraListaViaggi();
            mostraListaTrasporti();
            mostraListaAlloggi();
            mostraListaInteressi();
            mostraListaNote();
            aggiornaSidebar();

            alert('✅ Backup importato con successo! Trovi i tuoi dati in "I Miei Viaggi".');
            mostraVista('vista-viaggi');

        } catch (errore) {
            alert('❌ Errore nella lettura del file. Assicurati che sia un file .json valido.');
        }
    };

    reader.readAsText(file);
    event.target.value = '';
}
// ============================================
// MAPPA INTERATTIVA
// ============================================

let mappaIstanza = null;

function mostraScheda(nomeScheda) {
    document.querySelectorAll('.scheda').forEach(function(s) {
        s.style.display = 'none';
    });
    document.getElementById(nomeScheda).style.display = 'block';

    document.querySelectorAll('.scheda-btn').forEach(function(b) {
        b.classList.remove('attivo');
    });
    document.getElementById('btn-' + nomeScheda).classList.add('attivo');

    // Inizializza la mappa solo quando viene aperta la scheda
    if (nomeScheda === 'scheda-mappa' && viaggioSelezionatoId) {
        setTimeout(function() {
            caricaMappa(viaggioSelezionatoId);
        }, 100);
    }
    if (nomeScheda === 'scheda-spese' && viaggioSelezionatoId) {
        caricaSchedaSpese(viaggioSelezionatoId);
    }
}

async function geocodifica(indirizzo) {
    if (!indirizzo) return null;
    try {
        const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' +
            encodeURIComponent(indirizzo) + '&limit=1';
        const risposta = await fetch(url, {
            headers: { 'Accept-Language': 'it' }
        });
        const dati = await risposta.json();
        if (dati && dati.length > 0) {
            return {
                lat: parseFloat(dati[0].lat),
                lng: parseFloat(dati[0].lon),
                nome: dati[0].display_name
            };
        }
    } catch (e) {
        console.log('Geocoding fallito per:', indirizzo);
    }
    return null;
}

function creaIcona(colore, emoji) {
    return L.divIcon({
        html: `<div style="
            background-color: ${colore};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        "><span style="transform: rotate(45deg); font-size: 14px;">${emoji}</span></div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
}

async function caricaMappa(viaggioId) {
    const contenitore = document.getElementById('mappa');
    const legenda = document.getElementById('mappa-legenda');

    contenitore.innerHTML = '<div class="mappa-caricamento">🗺️ Caricamento mappa in corso...</div>';
    legenda.innerHTML = '';

    // Distruggi la mappa precedente se esiste
    if (mappaIstanza) {
        mappaIstanza.remove();
        mappaIstanza = null;
    }

    // Ricrea il div mappa (necessario dopo remove())
    contenitore.innerHTML = '';
    contenitore.style.height = '450px';

    // Inizializza la mappa centrata sull'Europa
    mappaIstanza = L.map('mappa').setView([45, 12], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mappaIstanza);

    const markers = [];
    const voci = [];

    // --- ALLOGGI ---
    const alloggi = leggiAlloggi().filter(function(a) { return a.viaggioId === viaggioId; });
    for (const a of alloggi) {
        if (a.indirizzo) {
            const coords = await geocodifica(a.indirizzo);
            if (coords) {
                const marker = L.marker([coords.lat, coords.lng], {
                    icon: creaIcona('#2c7be5', '🏨')
                }).addTo(mappaIstanza);
                marker.bindPopup(`<strong>${a.nome}</strong><br>${a.indirizzo}`);
                markers.push([coords.lat, coords.lng]);
                voci.push({ colore: '#2c7be5', testo: a.nome, tipo: 'Alloggio' });
            }
        }
    }

    // --- PUNTI DI INTERESSE ---
    const interessi = leggiInteressi().filter(function(i) { return i.viaggioId === viaggioId; });
    const coloriInteresse = { alta: '#cc0000', media: '#996600', bassa: '#006600' };
    for (const i of interessi) {
        if (i.indirizzo) {
            const coords = await geocodifica(i.indirizzo);
            if (coords) {
                const colore = coloriInteresse[i.priorita] || '#555';
                const marker = L.marker([coords.lat, coords.lng], {
                    icon: creaIcona(colore, iconaInteresse(i.tipo))
                }).addTo(mappaIstanza);
                marker.bindPopup(`<strong>${i.nome}</strong><br>${i.indirizzo}`);
                markers.push([coords.lat, coords.lng]);
                voci.push({ colore: colore, testo: i.nome, tipo: 'Interesse' });
            }
        }
    }

    // --- TRASPORTI (linee tra partenza e arrivo) ---
    const trasporti = leggiTrasporti().filter(function(t) { return t.viaggioId === viaggioId; });
    for (const t of trasporti) {
        const coordsDa = await geocodifica(t.da);
        const coordsA = await geocodifica(t.a);
        if (coordsDa && coordsA) {
            // Traccia una linea tratteggiata tra i due punti
            L.polyline(
                [[coordsDa.lat, coordsDa.lng], [coordsA.lat, coordsA.lng]],
                { color: '#ff6600', weight: 2, dashArray: '6, 8', opacity: 0.8 }
            ).addTo(mappaIstanza).bindPopup(
                `${iconaMezzo(t.mezzo)} ${t.da} → ${t.a}`
            );

            // Segnaposti per partenza e arrivo
            L.marker([coordsDa.lat, coordsDa.lng], {
                icon: creaIcona('#ff6600', iconaMezzo(t.mezzo))
            }).addTo(mappaIstanza).bindPopup(`Partenza: ${t.da}`);

            L.marker([coordsA.lat, coordsA.lng], {
                icon: creaIcona('#ff6600', iconaMezzo(t.mezzo))
            }).addTo(mappaIstanza).bindPopup(`Arrivo: ${t.a}`);

            markers.push([coordsDa.lat, coordsDa.lng]);
            markers.push([coordsA.lat, coordsA.lng]);
            voci.push({ colore: '#ff6600', testo: `${t.da} → ${t.a}`, tipo: 'Trasporto' });
        }
    }

    // Adatta lo zoom per mostrare tutti i markers
    if (markers.length > 0) {
        mappaIstanza.fitBounds(markers, { padding: [40, 40] });
    }

    // Costruisci la legenda
    if (voci.length > 0) {
        legenda.innerHTML = '<h4>📋 Elementi sulla mappa</h4>' +
            voci.map(function(v) {
                return `
                    <div class="legenda-voce">
                        <div class="legenda-dot" style="background-color:${v.colore};"></div>
                        <span><strong>${v.tipo}:</strong> ${v.testo}</span>
                    </div>
                `;
            }).join('');
    } else {
        legenda.innerHTML = '<p style="color:#999; font-size:13px;">Nessun elemento con indirizzo trovato.<br>Aggiungi indirizzi agli alloggi, interessi o trasporti.</p>';
    }
}
// ============================================
// NAVIGAZIONE MOBILE
// ============================================

function aggiornaSeletttoreMobile() {
    const lista = leggiViaggi();
    const select = document.getElementById('select-viaggio-mobile');
    if (!select) return;

    select.innerHTML = '<option value="">✈️ Seleziona un viaggio...</option>';
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
// SUGGERIMENTI CITTÀ
// ============================================

function aggiornaSuggerimentiCitta() {
    const interessi = leggiInteressi();

    // Raccoglie tutte le città già usate, rimuove i duplicati e i valori vuoti
    const citta = [...new Set(
        interessi.map(function(i) { return i.citta; }).filter(Boolean)
    )].sort();

    // Popola il datalist con le città trovate
    const datalist = document.getElementById('citta-suggerimenti');
    if (!datalist) return;

    datalist.innerHTML = citta.map(function(c) {
        return `<option value="${c}">`;
    }).join('');
}
// ============================================
// SCHEDA SPESE
// ============================================

function caricaSchedaSpese(viaggioId) {
    const contenitore = document.getElementById('scheda-spese');

    const trasporti = leggiTrasporti().filter(function(t) { return t.viaggioId === viaggioId; });
    const alloggi = leggiAlloggi().filter(function(a) { return a.viaggioId === viaggioId; });
    const interessi = leggiInteressi().filter(function(i) {
        return i.viaggioId === viaggioId && i.prezzo > 0;
    });

    // Calcola totali per categoria
    const totaleTrasporti = trasporti.reduce(function(sum, t) { return sum + (t.prezzo || 0); }, 0);
    const totaleAlloggi = alloggi.reduce(function(sum, a) { return sum + (a.prezzo || 0); }, 0);
    const totaleInteressi = interessi.reduce(function(sum, i) { return sum + (i.prezzo || 0); }, 0);
    const totaleGenerale = totaleTrasporti + totaleAlloggi + totaleInteressi;

    // Funzione per formattare i prezzi in euro
    function euro(importo) {
        return importo.toFixed(2).replace('.', ',') + ' €';
    }

    // Costruisce le righe di dettaglio per ogni categoria
    function rigaTrasporto(t) {
        if (!t.prezzo) return '';
        return `
            <div class="spesa-riga">
                <span>${iconaMezzo(t.mezzo)} ${t.da} → ${t.a}</span>
                <span class="spesa-importo">${euro(t.prezzo)}</span>
            </div>
        `;
    }

    function rigaAlloggio(a) {
        if (!a.prezzo) return '';
        return `
            <div class="spesa-riga">
                <span>${iconaTipo(a.tipo)} ${a.nome}</span>
                <span class="spesa-importo">${euro(a.prezzo)}</span>
            </div>
        `;
    }

    function rigaInteresse(i) {
        return `
            <div class="spesa-riga">
                <span>${iconaInteresse(i.tipo)} ${i.nome}</span>
                <span class="spesa-importo">${euro(i.prezzo)}</span>
            </div>
        `;
    }

    // Controlla se ci sono spese da mostrare
    const nessunaDato = totaleTrasporti === 0 && totaleAlloggi === 0 && totaleInteressi === 0;
    if (nessunaDato) {
        contenitore.innerHTML = `
            <div class="spese-vuoto">
                <p>💰 Nessuna spesa registrata per questo viaggio.</p>
                <p style="font-size:13px; color:#aaa;">Aggiungi un prezzo a trasporti, alloggi o attività.</p>
            </div>
        `;
        return;
    }

    contenitore.innerHTML = `

        <!-- Riepilogo totali -->
        <div class="spese-riepilogo">
            <div class="spesa-totale-card">
                <div class="spesa-totale-etichetta">💰 Totale viaggio</div>
                <div class="spesa-totale-valore">${euro(totaleGenerale)}</div>
            </div>
            <div class="spese-categorie-bar">
                ${totaleTrasporti > 0 ? `
                <div class="spesa-categoria-pill trasporti">
                    <span>🚂 Trasporti</span>
                    <strong>${euro(totaleTrasporti)}</strong>
                </div>` : ''}
                ${totaleAlloggi > 0 ? `
                <div class="spesa-categoria-pill alloggi">
                    <span>🏨 Alloggi</span>
                    <strong>${euro(totaleAlloggi)}</strong>
                </div>` : ''}
                ${totaleInteressi > 0 ? `
                <div class="spesa-categoria-pill interessi">
                    <span>🎯 Attività</span>
                    <strong>${euro(totaleInteressi)}</strong>
                </div>` : ''}
            </div>
        </div>

        <!-- Dettaglio trasporti -->
        ${totaleTrasporti > 0 ? `
        <div class="spese-gruppo">
            <div class="spese-gruppo-header">
                <span>🚂 Trasporti</span>
                <span>${euro(totaleTrasporti)}</span>
            </div>
            ${trasporti.map(rigaTrasporto).join('')}
        </div>` : ''}

        <!-- Dettaglio alloggi -->
        ${totaleAlloggi > 0 ? `
        <div class="spese-gruppo">
            <div class="spese-gruppo-header">
                <span>🏨 Alloggi</span>
                <span>${euro(totaleAlloggi)}</span>
            </div>
            ${alloggi.map(rigaAlloggio).join('')}
        </div>` : ''}

        <!-- Dettaglio attività/interessi -->
        ${totaleInteressi > 0 ? `
        <div class="spese-gruppo">
            <div class="spese-gruppo-header">
                <span>🎯 Attività e ingressi</span>
                <span>${euro(totaleInteressi)}</span>
            </div>
            ${interessi.map(rigaInteresse).join('')}
        </div>` : ''}

    `;
}
// ============================================
// GESTIONE ALLEGATI
// ============================================

// Variabili temporanee che tengono il file durante la compilazione del form
let allegatiTemp = {
    trasporto: null,
    alloggio: null
};

// Legge il file selezionato e lo converte in Base64
function anteprimaAllegato(tipo) {
    const input = document.getElementById(tipo + '-allegato');
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        allegatiTemp[tipo] = {
            nome: file.name,
            tipo: file.type,
            dati: e.target.result  // Base64
        };
        document.getElementById(tipo + '-allegato-nome').textContent = '📄 ' + file.name;
        document.getElementById(tipo + '-allegato-rimuovi').style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
}

// Rimuove l'allegato temporaneo
function rimuoviAllegato(tipo) {
    allegatiTemp[tipo] = null;
    document.getElementById(tipo + '-allegato').value = '';
    document.getElementById(tipo + '-allegato-nome').textContent = '';
    document.getElementById(tipo + '-allegato-rimuovi').style.display = 'none';
}

// Resetta il campo allegato dopo il salvataggio
function resetAllegato(tipo) {
    rimuoviAllegato(tipo);
}

// Mostra il visualizzatore PDF/immagine in una modale
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

// Chiude la modale
function chiudiModale() {
    document.getElementById('modale-allegato').style.display = 'none';
    document.getElementById('modale-allegato-corpo').innerHTML = '';
}

// Scarica l'allegato corrente
function scaricaAllegato() {
    const dati = document.getElementById('modale-allegato-dati').value;
    const nome = document.getElementById('modale-allegato-nome').value;
    const link = document.createElement('a');
    link.href = dati;
    link.download = nome;
    link.click();
}
// ============================================
// IMPOSTAZIONI — DARK MODE
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
// IMPOSTAZIONI — LINGUA
// ============================================

const traduzioni = {
    it: {
        nav_viaggi: '🌍 I Miei Viaggi',
        nav_inserimento: '➕ Inserisci Dati',
        nav_impostazioni: '⚙️ Impostazioni',
        ins_viaggi: '🌍 Viaggi',
        ins_trasporti: '🚂 Trasporti',
        ins_alloggi: '🏨 Alloggi',
        ins_interessi: '📍 Interessi',
        ins_note: '📝 Note',
        benvenuto_titolo: 'Benvenuto!',
        benvenuto_testo: 'Seleziona un viaggio dalla lista a sinistra<br>oppure creane uno nuovo nella sezione<br><strong>Inserisci Dati</strong>.',
        sidebar_titolo: '📋 I tuoi viaggi',
        sidebar_vuoto: 'Nessun viaggio ancora.<br>Vai su <strong>Inserisci Dati</strong> per aggiungerne uno.',
        scheda_trasporti: '🚂 Trasporti',
        scheda_alloggi: '🏨 Alloggi',
        scheda_interessi: '📍 Interessi',
        scheda_note: '📝 Note',
        scheda_mappa: '🗺️ Mappa',
        scheda_spese: '💰 Spese'
    },
    en: {
        nav_viaggi: '🌍 My Trips',
        nav_inserimento: '➕ Add Data',
        nav_impostazioni: '⚙️ Settings',
        ins_viaggi: '🌍 Trips',
        ins_trasporti: '🚂 Transport',
        ins_alloggi: '🏨 Accommodation',
        ins_interessi: '📍 Interests',
        ins_note: '📝 Notes',
        benvenuto_titolo: 'Welcome!',
        benvenuto_testo: 'Select a trip from the list on the left<br>or create a new one in the<br><strong>Add Data</strong> section.',
        sidebar_titolo: '📋 Your trips',
        sidebar_vuoto: 'No trips yet.<br>Go to <strong>Add Data</strong> to add one.',
        scheda_trasporti: '🚂 Transport',
        scheda_alloggi: '🏨 Accommodation',
        scheda_interessi: '📍 Interests',
        scheda_note: '📝 Notes',
        scheda_mappa: '🗺️ Map',
        scheda_spese: '💰 Expenses'
    }
};

let linguaAttuale = 'it';

function cambiaLingua(lingua) {
    linguaAttuale = lingua;
    localStorage.setItem('lingua', lingua);
    applicaLingua(lingua);
}

function applicaLingua(lingua) {
    const t = traduzioni[lingua];
    if (!t) return;

    // Navbar
    document.getElementById('nav-viaggi').textContent = t.nav_viaggi;
    document.getElementById('nav-inserimento').textContent = t.nav_inserimento;
    document.getElementById('nav-impostazioni').textContent = t.nav_impostazioni;

    // Bottoni inserimento
    document.getElementById('ins-viaggi').textContent = t.ins_viaggi;
    document.getElementById('ins-trasporti').textContent = t.ins_trasporti;
    document.getElementById('ins-alloggi').textContent = t.ins_alloggi;
    document.getElementById('ins-interessi').textContent = t.ins_interessi;
    document.getElementById('ins-note').textContent = t.ins_note;

    // Benvenuto
    const benvenutoH2 = document.querySelector('.benvenuto-box h2');
    const benvenutoP = document.querySelector('.benvenuto-box p');
    if (benvenutoH2) benvenutoH2.textContent = t.benvenuto_titolo;
    if (benvenutoP) benvenutoP.innerHTML = t.benvenuto_testo;

    // Sidebar titolo
    const sidebarH3 = document.querySelector('aside#sidebar-viaggi h3');
    if (sidebarH3) sidebarH3.textContent = t.sidebar_titolo;

    // Schede dettaglio
    document.getElementById('btn-scheda-trasporti').textContent = t.scheda_trasporti;
    document.getElementById('btn-scheda-alloggi').textContent = t.scheda_alloggi;
    document.getElementById('btn-scheda-interessi').textContent = t.scheda_interessi;
    document.getElementById('btn-scheda-note').textContent = t.scheda_note;
    document.getElementById('btn-scheda-mappa').textContent = t.scheda_mappa;
    document.getElementById('btn-scheda-spese').textContent = t.scheda_spese;

    // Aggiorna il selettore lingua
    const selectLingua = document.getElementById('select-lingua');
    if (selectLingua) selectLingua.value = lingua;
}

function caricaLingua() {
    const salvata = localStorage.getItem('lingua');
    if (salvata) {
        linguaAttuale = salvata;
        applicaLingua(salvata);
    }
}

// ============================================
// IMPOSTAZIONI — CANCELLA TUTTI I DATI
// ============================================

function cancellaTuttiDati() {
    const modale = document.getElementById('modale-cancella-dati');
    modale.style.display = 'flex';
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