const app = new Vue({

    el: "#app",

    data: {
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

        showChat(index) {

            const contact = this.contacts[index];

            // Modificare l'intestazione con foto e nome del contatto selezionato
            const contactHeader = document.querySelectorAll(".header_user")[1];
            contactHeader.innerHTML = '';

            const avatar = document.createElement("img");
            avatar.src = "./assets/img/avatar" + contact.avatar + ".jpg";
            avatar.classList.add("rounded_img", "h-100");
            contactHeader.appendChild(avatar);

            const name = document.createElement("div");
            name.classList.add("title_subtitle");
            name.innerHTML =
                `
                <strong id="selected_contact_name">${contact.name}</strong>
                <span>Ultimo accesso oggi alle 12:00</span>
                `;
            contactHeader.appendChild(name);

            // Colorare il contatto selezionato
            for (let i = 0; i < this.contacts.length; i++) {
                document.getElementById("contactNumber" + i).classList.remove("selected");
            }
            document.getElementById("contactNumber" + index).classList.add("selected");

            // Stampare a schermo tutti i messaggi sent nella colonna dell'utente e tutti i received nella colonna del contatto
            const userMessages = document.querySelector(".col_user");
            const contactMessages = document.querySelector(".col_contact");
            userMessages.innerHTML = '';
            contactMessages.innerHTML = '';

            contact.messages.forEach(element => {

                if (element.status === 'sent') {
                    //console.log(element.message);
                    console.log(typeof(element.date));

                    const messageBox = document.createElement("div");
                    messageBox.classList.add("message", "user_message");
                    const messageTime = element.date.slice(-8, -3);
                    messageBox.innerHTML =
                        `
                    <span>${element.message}</span>
                    <span class="subtitle" style="align-self: flex-end;">${messageTime}</span>
                    `;
                    userMessages.appendChild(messageBox);

                    // Creare uno spazio vuoto speculare nella colonna opposta
                    const emptyBox = document.createElement("div");
                    emptyBox.classList.add("message");
                    contactMessages.appendChild(emptyBox);

                } else if (element.status === 'received') {

                    const messageBox = document.createElement("div");
                    messageBox.classList.add("message", "contact_message");
                    const messageTime = element.date.slice(-8, -3);
                    messageBox.innerHTML =
                        `
                    <span>${element.message}</span>
                    <span class="subtitle" style="align-self: flex-end;">${messageTime}</span>
                    `;
                    contactMessages.appendChild(messageBox);

                    // Creare uno spazio vuoto speculare nella colonna opposta
                    const emptyBox = document.createElement("div");
                    emptyBox.classList.add("message");
                    userMessages.appendChild(emptyBox);

                }

            });

        }

    }

})