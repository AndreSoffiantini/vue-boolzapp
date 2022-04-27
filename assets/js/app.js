const app = new Vue({

    el: "#app",

    data: {
        selectedContact: 0,
        newMessageText: null,
        searchText: null,
        contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ]
    },

    methods: {

        selectContact(index) {
            this.selectedContact = index;
        },

        addMessage() {

            if (this.newMessageText) {

                // creare un nuovo oggetto messaggio contenente il messaggio inserito nel campo apposito
                const newMessage = {
                    date: '',
                    message: this.newMessageText,
                    status: 'sent'
                }

                // console.log(newMessage);

                // aggiungerlo alla lista dei messaggi dell'utente selezionato e stampare la chat con il nuovo messaggio
                this.pushMessage(newMessage);

                // pulire la barra di input dei messaggi
                console.log(document.getElementById("messageBar").value);
                document.getElementById("messageBar").value = "";
                console.log(document.getElementById("messageBar").value);

                // creare un messaggio di risposta automatica
                const newReply = {
                    date: '',
                    message: 'ok',
                    status: 'received'
                }

                // console.log(newReply);

                // stampare dopo un secondo la risposta automatica
                setTimeout(this.pushMessage, 1000, newReply);

            }

        },

        pushMessage(message) {
            this.contacts[this.selectedContact].messages.push(message);
        },

        searchContact() {

            // Impostare il testo inserito dall'utente in minuscolo (per ignorare il case sensitive)
            const text = this.searchText.toLowerCase();

            if (text != null) {

                // Se l'utente svuota la barra di ricerca e preme invio viene visualizzata nuovamente la lista intera
                if (text === '') {

                    this.contacts.forEach(contact => { contact.visible = true });

                } else {

                    //console.log(this.contacts[0].name.includes('ch'));

                    this.contacts.forEach(contact => {

                        // Leggere il nome di ciascun contatto in minuscolo (per ignorare il case sensitive)
                        let contactName = contact.name.toLowerCase();

                        if (!contactName.includes(text)) {
                            contact.visible = false;
                        }

                    });

                }

            }

        },

        deleteMessage(index) {
            this.contacts[this.selectedContact].messages.splice(index, 1);
        }

    }

})