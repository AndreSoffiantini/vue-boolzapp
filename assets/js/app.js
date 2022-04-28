const app = new Vue({

    el: "#app",

    data: {
        selectedContact: 0,
        newMessageText: null,
        searchText: null,
        contactStatus: 'Ultimo accesso oggi alle 12:00',
        quotes: [
            "The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela",
            "The way to get started is to quit talking and begin doing. -Walt Disney",
            "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. -Steve Jobs",
            "If life were predictable it would cease to be life, and be without flavor. -Eleanor Roosevelt",
            "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough. -Oprah Winfrey",
            "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. -James Cameron",
            "Life is what happens when you're busy making other plans. -John Lennon"
        ],
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

        sendMessage() {

            // Il messaggio non viene inviato se vuoto o composto solamente da spazi
            if (this.newMessageText && !this.newMessageText.split('').every(letter => letter === ' ')) {

                // creare un nuovo oggetto messaggio contenente il messaggio inserito nel campo apposito
                const newMessage = {
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: this.newMessageText,
                    status: 'sent'
                }

                //console.log(newMessage);

                // aggiungerlo alla lista dei messaggi dell'utente selezionato e stampare la chat con il nuovo messaggio
                this.pushMessage(newMessage);

                // pulire la barra di input dei messaggi
                this.newMessageText = null;

                // stampare a schermo la notifica 'sta scrivendo...' in attesa della risposta automatica
                setTimeout(this.changeContactStatus, 350, 'sta scrivendo...');

                // stampare dopo un secondo la risposta automatica
                setTimeout(this.autoReply, 1000);

            }

        },

        autoReply() {

            // creare un nuovo oggetto messaggio contenente una citazione selezionata casualmente dall'apposito array
            const newReply = {
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                message: this.quotes[Math.floor(Math.random() * this.quotes.length)],
                status: 'received'
            }

            //console.log(newReply);

            // aggiungerlo alla lista dei messaggi dell'utente selezionato e stampare la chat con il nuovo messaggio
            this.pushMessage(newReply);

            // stampare a schermo la notifica 'online'
            this.changeContactStatus('online');

            // dopo un paio di secondi visualizzare "ultimo accesso alle xx:yy" con l'orario corretto
            setTimeout(this.changeContactStatus, 2000, `Ultimo accesso alle ${dayjs().format('HH:mm')}`);
        },

        pushMessage(message) {
            this.contacts[this.selectedContact].messages.push(message);
        },

        changeContactStatus(status) {
            this.contactStatus = status;
        },

        searchContact() {

            // Rendere inizialmente tutti i contatti visibili
            this.contacts.forEach(contact => { contact.visible = true });

            // Impostare il testo inserito dall'utente in minuscolo (per ignorare il case sensitive)
            const text = this.searchText.toLowerCase();

            if (text != null) {

                // Se l'utente svuota la barra di ricerca e preme invio viene visualizzata nuovamente la lista intera
                if (text === '') {

                    return;

                } else {

                    //console.log(this.contacts[0].name.includes('ch'));

                    this.contacts.forEach(contact => {

                        // Leggere il nome di ciascun contatto in minuscolo (per ignorare il case sensitive)
                        let contactName = contact.name.toLowerCase();

                        // Se il nome del contatto non include il testo inserito nascondere il contatto
                        if (!contactName.includes(text)) {
                            contact.visible = false;
                        }

                    });

                }

            }

        },

        deleteMessage(index) {

            if (this.contacts[this.selectedContact].messages.length > 1) {

                this.contacts[this.selectedContact].messages.splice(index, 1);

            }
        },


    }

})