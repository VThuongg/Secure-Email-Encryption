///__________Ẩn hiện các form__________///
// ---- Ẩn hiện sidebar ---- //
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
});

// Kết nối đến WebSocket server
const socket = io();

function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}

// ---- Ẩn hiện các form ---- //
document.addEventListener("DOMContentLoaded", function() {
    // ---- Const các nút bấm ---- //
    // Nút sidebar
    const mailCreateBtn = document.querySelector('.mail-create');
    const mailReceivedBtn = document.querySelector('.mail-received');
    const mailStarredBtn = document.querySelector('.mail-starred');
    const mailSendBtn = document.querySelector('.mail-send');
    const mailTrashBtn = document.querySelector('.mail-trash');
    const contactsListBtn = document.querySelector('.contacts-list');

    // Nút bên home-section
    const mailProfileBtn = document.querySelector(".profile-details");
    const mailChangeBtn = document.querySelector(".recover-key");
    const mailRepReceivedBtn = document.querySelector('.btn-rep-email-received');
    const mailForwardReceivedBtn = document.querySelector('.btn-forward-email-received');
    const mailRepSentBtn = document.querySelector('.btn-rep-email-sent');
    const mailForwardSentBtn = document.querySelector('.btn-forward-email-sent');

    // Nút tắt
    const closeChangePassword = document.getElementById('close-change');
    const closeFormCreateMail = document.getElementById('close-compose');
    const closeFormSeenMail = document.getElementById('close-form-seen');
    const closeButton = document.getElementById('closeFormDecode');

    // Trả lời
    const closeRepSentMail = document.getElementById('close-rep-seen');
    const closeRepReceived = document.getElementById('close-rep-received');

    // ---- Const các form ---- //
    // Form sidebar
    const formMailCreate = document.querySelector('.form-create-mail');
    const formMailReceived = document.querySelector('.form-mail-received');
    const formMailStarred = document.querySelector('.form-mail-starred');
    const formMailSend = document.querySelector('.form-mail-send');
    const formMailTrash = document.querySelector('.form-trash-mail');
    const formContactsList = document.querySelector('.form-contacts-list');

    // Form bên home-section
    const formProfile = document.querySelector('.form-account');
    const formRecoverKey = document.querySelector('.form-recover-key');
    const formSeenMail = document.getElementById('formSeen');
    const formDecode = document.getElementById('formDecode');
    const formRepSentMail = document.getElementById('form-rep-sent');
    const formRepReceivedMail = document.getElementById('form-rep-received');

    let isFormRecover = false;

    // Reset form trước khi chuyển đổi form khác
    function resetForms() {
        formMailReceived.classList.remove('active');
        formMailStarred.classList.remove('active');
        formMailSend.classList.remove('active');
        formMailTrash.classList.remove('active');
        formContactsList.classList.remove('active');
    }

    // Hàm xóa lớp 'hover-effect' khỏi tất cả các mục menu
    function removeAllHoverEffects() {
        document.querySelectorAll('.sidebar li a').forEach(item => {
            item.classList.remove('hover-effect');
        });
    }

    // Khôi phục active tab từ sessionStorage hoặc mặc định là thư đến
    const activeTab = sessionStorage.getItem('activeTab') || 'mail-received';
    resetForms();
    removeAllHoverEffects();
    if (activeTab === 'mail-received') {
        formMailReceived.classList.add('active');
        document.querySelector('a.mail-received')?.classList.add('hover-effect');
    } else if (activeTab === 'mail-starred') {
        formMailStarred.classList.add('active');
        document.querySelector('a.mail-starred')?.classList.add('hover-effect');
    } else if (activeTab === 'mail-send') {
        formMailSend.classList.add('active');
        document.querySelector('a.mail-send')?.classList.add('hover-effect');
    } else if (activeTab === 'mail-trash') {
        formMailTrash.classList.add('active');
        document.querySelector('a.mail-trash')?.classList.add('hover-effect');
    } else if (activeTab === 'contacts-list') {
        formContactsList.classList.add('active');
        document.querySelector('a.contacts-list')?.classList.add('hover-effect');
        loadContactsList();
    }

    // Mở form hộp thư đến
    mailReceivedBtn.addEventListener('click', function() {
        sessionStorage.setItem('activeTab', 'mail-received');
        hideFormDecode();
        hideFormSeen();
        resetForms();
        formMailReceived.classList.add('active');
        removeAllHoverEffects();
        document.querySelector('a.mail-received').classList.add('hover-effect');
    });

    // Mở form hộp thư gắn sao
    mailStarredBtn?.addEventListener('click', function() {
        sessionStorage.setItem('activeTab', 'mail-starred');
        hideFormDecode();
        hideFormSeen();
        resetForms();
        formMailStarred.classList.add('active');
        removeAllHoverEffects();
        document.querySelector('a.mail-starred').classList.add('hover-effect');
    });

    // Mở form thư đã gửi
    mailSendBtn.addEventListener('click', function() {
        sessionStorage.setItem('activeTab', 'mail-send');
        hideFormDecode();
        hideFormSeen();
        resetForms();
        formMailSend.classList.add('active');
        removeAllHoverEffects();
        document.querySelector('a.mail-send').classList.add('hover-effect');
    });

    // Mở form thùng rác
    mailTrashBtn.addEventListener('click', function() {
        sessionStorage.setItem('activeTab', 'mail-trash');
        hideFormDecode();
        hideFormSeen();
        resetForms();
        formMailTrash.classList.add('active');
        removeAllHoverEffects();
        document.querySelector('a.mail-trash').classList.add('hover-effect');
    });

    // Mở form danh bạ
    contactsListBtn?.addEventListener('click', function() {
        sessionStorage.setItem('activeTab', 'contacts-list');
        hideFormDecode();
        hideFormSeen();
        resetForms();
        formContactsList.classList.add('active');
        removeAllHoverEffects();
        document.querySelector('a.contacts-list').classList.add('hover-effect');
        loadContactsList();
    });

    // Mở form soạn thư
    mailCreateBtn?.addEventListener('click', function() {
        formMailCreate.classList.toggle('active');
    });

    // Đóng form soạn thư
    function closeCreateMail() {
        formMailCreate.classList.remove('active');
        formMailCreate.classList.remove('minimized');
        const minBtn = document.getElementById('minimize-compose');
        if (minBtn) {
            minBtn.className = 'bx bx-minus';
        }
        document.getElementById('recipient').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('main').innerText = '';
    }
    closeFormCreateMail?.addEventListener('click', closeCreateMail);

    // Thu nhỏ / Phóng to form soạn thư
    const minimizeComposeBtn = document.getElementById('minimize-compose');
    minimizeComposeBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài header
        toggleMinimizeCompose();
    });

    // Click vào Header để phục hồi nếu đang thu nhỏ
    const headCreateMail = document.querySelector('.head-create-mail');
    headCreateMail?.addEventListener('click', function(e) {
        if (formMailCreate.classList.contains('minimized')) {
            toggleMinimizeCompose();
        }
    });

    function toggleMinimizeCompose() {
        formMailCreate.classList.toggle('minimized');
        const isMin = formMailCreate.classList.contains('minimized');
        const minBtn = document.getElementById('minimize-compose');
        if (minBtn) {
            if (isMin) {
                minBtn.className = 'bx bx-chevron-up'; // Đổi sang biểu tượng mũi tên lên để phóng to
            } else {
                minBtn.className = 'bx bx-minus'; // Đổi lại biểu tượng trừ
            }
        }
    }

    // Mở form thông tin tài khoản
    mailProfileBtn?.addEventListener("click", function() {
            formProfile.classList.toggle('active');
    });

    // Mở và đóng form đổi mật khẩu
    mailChangeBtn?.addEventListener("click", function(e) {
        e.preventDefault();
        if (!isFormRecover) {
            formRecoverKey.style.opacity = 1;
            formRecoverKey.style.visibility = "visible";
            formRecoverKey.style.transform = "scale(1)";
            isFormRecover = true;
        } else {
            formRecoverKey.style.opacity = 0;
            formRecoverKey.style.visibility = "hidden";
            formRecoverKey.style.transform = "scale(0)";
            isFormRecover = false;
        }
    });

    function closeFormRecoverKey() {
        formRecoverKey.classList.remove('active');
        formRecoverKey.style.opacity = 0;
        formRecoverKey.style.visibility = "hidden";
        formRecoverKey.style.transform = "scale(0)";
        isFormRecover = false;
    }
    closeChangePassword?.addEventListener('click', closeFormRecoverKey);

    const btnBackDecode = document.getElementById('btnBackDecode');
    const btnBackSeen = document.getElementById('btnBackSeen');

    btnBackDecode?.addEventListener('click', hideFormDecode);
    btnBackSeen?.addEventListener('click', hideFormSeen);

    // ----- Lấy thông tin cho formDecode ----- //
    function hideFormDecode() {
        if (formDecode) {
            formRepReceivedMail.classList.remove('active');
            formDecode.classList.remove('active');
            formMailReceived.classList.add('active');
        }
    }

    function showFormDecode() {
        if (formDecode) {
            formMailReceived.classList.remove('active');
            formDecode.classList.add('active');
        }
    }

    document.querySelectorAll('.btn-show-decode').forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();

            const url = this.href;
            const emailRow = this.closest('.email-row');

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('senderEmail').innerText = data.sender_email;
                    document.getElementById('subjectEmail').innerText = data.subject;
                    const timestamp = new Date(data.timestamp);
                    document.getElementById('timeEmailReceived').innerText = timestamp.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

                    if (data.sender_email) {
                        const emailStr = data.sender_email;
                        const username = emailStr.split('@')[0];
                        const firstChar = emailStr.charAt(0).toUpperCase();

                        const avatarCharEl = document.getElementById('senderAvatarChar');
                        if (avatarCharEl) avatarCharEl.innerText = firstChar;

                        const senderNameEl = document.getElementById('senderEmailName');
                        if (senderNameEl) senderNameEl.innerText = username;

                        const avatarEl = document.getElementById('senderAvatar');
                        if (avatarEl) {
                            avatarEl.className = 'sender-avatar avatar-' + firstChar.toLowerCase();
                        }
                    }
     
                    if (data.decrypted_body) {
                        let decryptedBody = data.decrypted_body; // Chuyển đổi các ký tự xuống dòng thành thẻ <br>
                        decryptedBody = decryptedBody.replace(/\n/g, '<br>');
                        document.getElementById('decryptedBody').innerHTML = decryptedBody;
                        document.getElementById('bodyContent').style.display = 'block';
                        document.getElementById('noDecryptedBody').style.display = 'none';
                    } else {
                        document.getElementById('bodyContent').style.display = 'none';
                        document.getElementById('noDecryptedBody').style.display = 'block';
                    }

                    if (data.decrypted_attachments && data.decrypted_attachments.length > 0) {
                        let attachmentsHTML = '';
                        data.decrypted_attachments.forEach(attachment => {
                            const fileIcon = getIconByFileExtension(attachment.filename);
                            const isImage = ['png', 'jpg', 'jpeg', 'gif'].includes(attachment.filename.split('.').pop().toLowerCase());
                            if (isImage) {
                                attachmentsHTML += `
                                    <div class="merge-file">
                                        <div class="form-file">
                                            <img class="img-preview" src="${attachment.path}" alt="${attachment.filename}" style="cursor: pointer;" onclick="window.open('${attachment.path}', '_blank')" />
                                            <a href="${attachment.path}" download>
                                                <span class="icon-small"><i class="bx bxs-image" style="color: #10b981"></i></span>
                                                ${attachment.filename}
                                            </a>
                                            <div class="corner-triangle" style="border-top-color: #10b981;"></div>
                                        </div>
                                    </div>
                                `;
                            } else {
                                attachmentsHTML += `
                                    <div class="merge-file">
                                        <div class="form-file">
                                            <div class="line">
                                                ${fileIcon.icon}
                                            </div>
                                            <a href="${attachment.path}" download>
                                                <span class="icon-small">${fileIcon.icon}</span>
                                                ${attachment.filename}
                                            </a>
                                            <div class="corner-triangle" style="border-top-color: ${fileIcon.color};"></div>
                                        </div>
                                    </div>
                                `;
                            }
                        });
                        document.getElementById('attachmentsList').innerHTML = attachmentsHTML;
                        document.getElementById('attachmentsContent').style.display = 'block';
                        document.getElementById('noAttachmentsContent').style.display = 'none';
                    } else {
                        document.getElementById('attachmentsContent').style.display = 'none';
                        document.getElementById('noAttachmentsContent').style.display = 'block';
                    }

                    const repMailContainer = document.querySelector('.position-end-decode .rep-mail');
                    if (repMailContainer) {
                        if (data.is_expired || data.is_recalled) {
                            repMailContainer.style.display = 'none';
                        } else {
                            repMailContainer.style.display = 'flex';
                        }
                    }

                    if (closeButton) {
                        closeButton.addEventListener('click', hideFormDecode);
                    }

                    showFormDecode();

                    function getIconByFileExtension(filename) {
                        const ext = filename.split('.').pop().toLowerCase();
                        switch (ext) {
                            case 'pdf':
                                return { icon: '<i class="bx bxs-file-pdf icon-file" style="color: red"></i>', color: 'red' };
                            case 'xlsx':
                                return { icon: '<i class="fa fa-file-excel icon-file" style="color: green"></i>', color: 'green' };
                            case 'txt':
                                return { icon: '<i class="bx bxs-file-txt icon-file"></i>', color: 'gray' };
                            case 'doc': case 'docx':
                                return { icon: '<i class="bx bxs-file-doc icon-file" style="color: blue"></i>', color: 'blue' };
                            case 'zip':
                                return { icon: '<i class="bx bxs-file-archive icon-file"></i>', color: 'orange' };
                            default:
                                return { icon: '<i class="bx bxs-file icon-file"></i>', color: 'black' };
                        }
                    }
                    emailRow.classList.remove('unread');
                    emailRow.classList.add('read');
                })
            .catch(error => console.error('Error fetching data:', error));
        });
    });

    // Mở form trả lời thư
    mailRepReceivedBtn?.addEventListener('click', function () {
        formRepReceivedMail.classList.toggle('active');
        document.getElementById('title-received').innerHTML = 'Trả lời thư';
        document.getElementById('recipient-received').value = document.getElementById('senderEmail').innerText;
        document.getElementById('subject-received').value = 'Rep: ';
        document.getElementById('main-received').innerText = 
            '\n\n\n\n' +
            'Vào lúc: ' + document.getElementById('timeEmailReceived').innerText + 
            ' < ' + document.getElementById('senderEmail').innerText + ' > đã viết:' + '\n\n' +
            document.getElementById('decryptedBody').innerText;
    })

    // Mở form chuyển tiếp
    mailForwardReceivedBtn?.addEventListener('click', function () {
        formRepReceivedMail.classList.toggle('active');  
        document.getElementById('title-received').innerHTML = 'Chuyển tiếp thư';
        document.getElementById('recipient-received').value = '';
        document.getElementById('subject-received').value = 'Forward: ';
        document.getElementById('main-received').innerText = 
            '\n\n\n\n' +
            '----Forwarded message----' + '\n' +
            'Từ: < ' + document.getElementById('senderEmail').innerText + ' >' + '\n' +
            'Thời gian: ' + document.getElementById('timeEmailReceived').innerText + '\n' +
            'Tiêu đề: ' + document.getElementById('subjectEmail').innerText + '\n' + 
            'Với nội dung sau:' + '\n\n' +
            document.getElementById('decryptedBody').innerText; 
    }) 

    // Đóng form trả lời thư
    closeRepReceived?.addEventListener('click', function () {
        formRepReceivedMail.classList.remove('active');
    });

     // ----- Lấy thông tin cho formSentMail ----- //
    function hideFormSeen() {
        if (formSeenMail) {
            formRepSentMail.classList.remove('active');
            formSeenMail.classList.remove('active');
            formMailSend.classList.add('active');
        }
    }

    function showFormSeen() {
        if (formSeenMail) {
            formMailSend.classList.remove('active');
            formSeenMail.classList.add('active');
        }
    }

    document.querySelectorAll('.btn-show-details').forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();

            fetch(this.href)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('messEmail').innerText = data.message;
                    document.getElementById('receiverEmail').innerText = data.receiver_email;
                    document.getElementById('sendEmail').innerText = data.send_email;
                    document.getElementById('subjectSeen').innerText = data.subject;
                    const timestamp = new Date(data.timestamp);
                    document.getElementById('timeEmailSent').innerText = timestamp.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

                    if (data.send_email) {
                        const emailStr = data.send_email;
                        const firstChar = emailStr.charAt(0).toUpperCase();
                        const avatarCharEl = document.getElementById('senderSeenAvatarChar');
                        if (avatarCharEl) avatarCharEl.innerText = firstChar;

                        const avatarEl = document.getElementById('senderSeenAvatar');
                        if (avatarEl) {
                            avatarEl.className = 'sender-avatar avatar-' + firstChar.toLowerCase();
                        }
                    }

                    if (data.receiver_email) {
                        const recEmail = data.receiver_email;
                        const recUsername = recEmail.split('@')[0];
                        const receiverNameEl = document.getElementById('receiverEmailName');
                        if (receiverNameEl) receiverNameEl.innerText = recUsername;
                    }

                    if (data.decrypted_body_send) {
                        let decrypted_Body_send = data.decrypted_body_send.replace(/\n/g, '<br>');
                        document.getElementById('decryptedBodySeen').innerHTML = decrypted_Body_send;
                        document.getElementById('bodyContent').style.display = 'block';
                        document.getElementById('noDecryptedBody').style.display = 'none';
                    } else {
                        document.getElementById('bodyContent').style.display = 'none';
                        document.getElementById('noDecryptedBody').style.display = 'block';
                    }

                    if (data.decrypted_attachments && data.decrypted_attachments.length > 0) {
                        let attachmentsHTML = '';
                        data.decrypted_attachments.forEach(attachment => {
                            const fileIcon = getIconByFileExtension(attachment.filename);
                            const isImage = ['png', 'jpg', 'jpeg', 'gif'].includes(attachment.filename.split('.').pop().toLowerCase());
                            if (isImage) {
                                attachmentsHTML += `
                                    <div class="merge-file">
                                        <div class="form-file">
                                            <img class="img-preview" src="${attachment.path}" alt="${attachment.filename}" style="cursor: pointer;" onclick="window.open('${attachment.path}', '_blank')" />
                                            <a href="${attachment.path}" download>
                                                <span class="icon-small"><i class="bx bxs-image" style="color: #10b981"></i></span>
                                                ${attachment.filename}
                                            </a>
                                            <div class="corner-triangle" style="border-top-color: #10b981;"></div>
                                        </div>
                                    </div>
                                `;
                            } else {
                                attachmentsHTML += `
                                    <div class="merge-file">
                                        <div class="form-file">
                                            <div class="line">${fileIcon.icon}</div>
                                            <a href="${attachment.path}" download>
                                                <span class="icon-small">${fileIcon.icon}</span>
                                                ${attachment.filename}
                                            </a>
                                            <div class="corner-triangle" style="border-top-color: ${fileIcon.color};"></div>
                                        </div>
                                    </div>
                                `;
                            }
                        });

                        document.getElementById('attachmentsSeenList').innerHTML = attachmentsHTML;
                        document.getElementById('attachmentsSeenContent').style.display = 'block';
                        document.getElementById('noAttachmentsSeenContent').style.display = 'none';
                    } else {
                        document.getElementById('attachmentsSeenContent').style.display = 'none';
                        document.getElementById('noAttachmentsSeenContent').style.display = 'block';
                    }

                    // Xử lý hiển thị nút Thu hồi (Recall) thư
                    const recallBtn = document.getElementById('btnRecallEmail');
                    if (recallBtn) {
                        if (data.id && !data.is_read && !data.is_recalled) {
                            recallBtn.style.display = 'inline-flex';
                            recallBtn.onclick = function(e) {
                                e.preventDefault();
                                if (confirm('Bạn có chắc chắn muốn thu hồi email này không?')) {
                                    fetch(`/recall_email/${data.id}`, { method: 'POST' })
                                        .then(res => res.json())
                                        .then(resData => {
                                            if (resData.success) {
                                                alert(resData.message);
                                                location.reload();
                                            } else {
                                                alert(resData.message);
                                            }
                                        })
                                        .catch(err => console.error('Lỗi khi thu hồi thư:', err));
                                }
                            };
                        } else {
                            recallBtn.style.display = 'none';
                        }
                    }

                    const repMailSentContainer = document.querySelector('.position-end-seen .rep-mail');
                    if (repMailSentContainer) {
                        if (data.is_expired || data.is_recalled) {
                            repMailSentContainer.style.display = 'none';
                        } else {
                            repMailSentContainer.style.display = 'flex';
                        }
                    }

                    if (closeFormSeenMail) {
                        closeFormSeenMail.addEventListener('click', hideFormSeen);
                    }

                    showFormSeen();

                    function getIconByFileExtension(filename) {
                        const ext = filename.split('.').pop().toLowerCase();
                        switch (ext) {
                            case 'pdf': return { icon: '<i class="bx bxs-file-pdf icon-file" style="color: red"></i>', color: 'red' };
                            case 'xlsx': return { icon: '<i class="fa fa-file-excel icon-file" style="color: green"></i>', color: 'green' };
                            case 'txt': return { icon: '<i class="bx bxs-file-txt icon-file"></i>', color: 'gray' };
                            case 'doc': case 'docx': return { icon: '<i class="bx bxs-file-doc icon-file" style="color: blue"></i>', color: 'blue' };
                            case 'zip': return { icon: '<i class="bx bxs-file-archive icon-file"></i>', color: 'orange' };
                            default: return { icon: '<i class="bx bxs-file icon-file"></i>', color: 'black' };
                        }
                    }
                })
            .catch(error => console.error('Error fetching data:', error));
        });
    });

    // Mở form trả lời thư
    mailRepSentBtn?.addEventListener('click', function () {
        formRepSentMail.classList.toggle('active');
        document.getElementById('title-sent').innerHTML = 'Trả lời thư';
        document.getElementById('recipient-sent').value = document.getElementById('receiverEmail').innerText;
        document.getElementById('subject-sent').value = 'Rep: ';
        document.getElementById('main-sent').innerText = 
            '\n\n\n\n' +
            'Vào lúc: ' + document.getElementById('timeEmailSent').innerText + 
            ' < ' + document.getElementById('receiverEmail').innerText + ' > đã viết:' + '\n\n' +
            document.getElementById('decryptedBodySeen').innerText;
    })

    // Mở form chuyển tiếp
    mailForwardSentBtn?.addEventListener('click', function () {
        formRepSentMail.classList.toggle('active');
        document.getElementById('title-sent').innerHTML = 'Chuyển tiếp thư';
        document.getElementById('recipient-sent').value = '';
        document.getElementById('subject-sent').value = 'Forward: ';
        document.getElementById('main-sent').innerText = 
            '\n\n\n\n' +
            '----Forwarded message----' + '\n' +
            'Từ: < ' + document.getElementById('sendEmail').innerText + ' >' + '\n' +
            'Thời gian: ' + document.getElementById('timeEmailSent').innerText + '\n' +
            'Tiêu đề: ' + document.getElementById('subjectSeen').innerText + '\n' +
            'Đến: < ' + document.getElementById('receiverEmail').innerText + ' >' + '\n\n' + 
            document.getElementById('decryptedBodySeen').innerText;   
    }) 

    // Đóng form trả lời thư
    closeRepSentMail?.addEventListener('click', function () {
        formRepSentMail.classList.remove('active');
    });
    
    // ----- Đóng form khi click ngoài form ----- //
    document.addEventListener('click', function(event) {
        if (!formRecoverKey.contains(event.target) && !event.target.closest('.recover-key')) {
            closeFormRecoverKey();
        }
    });

    // Hàm chung để điều chỉnh vị trí formRep theo form cha
    function setPositionAtBottom(form, parentForm) { 
        const clientHeight = parentForm.clientHeight;  
        const scrollTop = parentForm.scrollTop; 
        
        form.style.top = `${scrollTop + clientHeight - form.offsetHeight}px`;
    }

    if (formDecode && formRepReceivedMail) {
        formDecode.addEventListener('scroll', function () {
            setPositionAtBottom(formRepReceivedMail, formDecode);
        });

        setPositionAtBottom(formRepReceivedMail, formDecode);
    }

    if (formSeenMail && formRepSentMail) {
        formSeenMail.addEventListener('scroll', function () {
            setPositionAtBottom(formRepSentMail, formSeenMail);
        });

        setPositionAtBottom(formRepSentMail, formSeenMail);
    }

    // Nút quay lại ở đầu trang đọc thư
    document.getElementById('btnBackDecode')?.addEventListener('click', hideFormDecode);
    document.getElementById('btnBackSeen')?.addEventListener('click', hideFormSeen);

    // Bắt sự kiện click vào hàng để mở nội dung thư
    document.querySelectorAll('.email-table').forEach(table => {
        table.addEventListener('click', function(event) {
            // Không kích hoạt nếu click vào checkbox hoặc cột checkbox hoặc nút gắn sao
            if (event.target.type === 'checkbox' || event.target.closest('.col-checkbox') || event.target.closest('input[type="checkbox"]') || event.target.closest('.btn-star')) {
                return;
            }

            const row = event.target.closest('.email-row');
            if (row) {
                const decodeBtn = row.querySelector('.btn-show-decode');
                if (decodeBtn) {
                    decodeBtn.click();
                    return;
                }
                const detailsBtn = row.querySelector('.btn-show-details');
                if (detailsBtn) {
                    detailsBtn.click();
                    return;
                }
            }
        });
    });

    // 1. Logic Gắn Sao (Star toggling)
    document.addEventListener('click', function(e) {
        const starBtn = e.target.closest('.btn-star');
        if (starBtn) {
            e.preventDefault();
            e.stopPropagation();
            const emailId = starBtn.getAttribute('data-email-id');
            fetch(`/toggle_star/${emailId}`, { method: 'POST' })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        location.reload();
                    } else {
                        alert(data.message || 'Lỗi khi thay đổi trạng thái gắn sao.');
                    }
                })
                .catch(err => console.error('Error toggling star:', err));
        }
    });

    // Helper escape HTML
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // 2. Logic Danh Bạ (Address Book)
    function loadContactsList() {
        fetch('/contacts')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const tbody = document.getElementById('contacts-table-body');
                    if (tbody) {
                        tbody.innerHTML = '';
                        data.contacts.forEach(c => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${escapeHtml(c.name)}</td>
                                <td>${escapeHtml(c.email)}</td>
                                <td>
                                    <span style="padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; ${c.public_key_status === 'Có' ? 'background: #dcfce7; color: #15803d;' : 'background: #fee2e2; color: #b91c1c;'}">
                                        ${c.public_key_status}
                                    </span>
                                </td>
                                <td>
                                    <button class="btn-delete-contact" data-id="${c.id}" style="background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); padding: 6px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 13px;">
                                        <i class='bx bx-trash'></i> Xóa
                                    </button>
                                </td>
                            `;
                            tbody.appendChild(row);
                        });

                        // Bind delete click handlers
                        tbody.querySelectorAll('.btn-delete-contact').forEach(btn => {
                            btn.addEventListener('click', function(e) {
                                e.preventDefault();
                                const id = this.getAttribute('data-id');
                                if (confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
                                    fetch(`/contacts/delete/${id}`, { method: 'POST' })
                                        .then(res => res.json())
                                        .then(resData => {
                                            if (resData.success) {
                                                loadContactsList();
                                            } else {
                                                alert(resData.message);
                                            }
                                        })
                                        .catch(err => console.error('Lỗi khi xóa liên hệ:', err));
                                }
                            });
                        });
                    }
                }
            })
            .catch(err => console.error('Lỗi tải danh bạ:', err));
    }
    window.loadContactsList = loadContactsList;

    // Open Modal Thêm Danh bạ
    const btnOpenAddContact = document.getElementById('btnOpenAddContact');
    btnOpenAddContact?.addEventListener('click', function() {
        document.getElementById('addContactModal').classList.add('active');
    });

    // Submit form thêm danh bạ
    const addContactForm = document.getElementById('add-contact-form');
    addContactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('contact_name').value;
        const email = document.getElementById('contact_email').value;

        fetch('/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById('addContactModal').classList.remove('active');
                addContactForm.reset();
                loadContactsList();
            } else {
                alert(data.message);
            }
        })
        .catch(err => console.error('Lỗi thêm liên hệ:', err));
    });

    // 3. Logic Autocomplete
    let contactsCache = [];
    function fetchContactsForAutocomplete() {
        fetch('/contacts')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    contactsCache = data.contacts;
                }
            });
    }

    const recipientInput = document.getElementById('recipient');
    const autocompleteDropdown = document.getElementById('recipient-autocomplete');

    if (recipientInput && autocompleteDropdown) {
        recipientInput.addEventListener('focus', function() {
            fetchContactsForAutocomplete();
        });

        recipientInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            if (!query) {
                autocompleteDropdown.style.display = 'none';
                return;
            }

            const matches = contactsCache.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.email.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                autocompleteDropdown.style.display = 'none';
                return;
            }

            autocompleteDropdown.innerHTML = '';
            matches.forEach(m => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `<strong>${escapeHtml(m.name)}</strong> &lt;${escapeHtml(m.email)}&gt;`;
                item.addEventListener('click', function() {
                    recipientInput.value = m.email;
                    autocompleteDropdown.style.display = 'none';
                });
                autocompleteDropdown.appendChild(item);
            });
            autocompleteDropdown.style.display = 'block';
        });

        document.addEventListener('click', function(e) {
            if (!recipientInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
                autocompleteDropdown.style.display = 'none';
            }
        });
    }
  });

///_____________________Ẩn hiện nút Delete_____________________///
// ---- Nút Delete của form thư đến ---- //
function toggleDeleteIconReceived() {
    let checkboxesChecked = document.querySelectorAll('.email-checkbox-received:checked').length > 0;
    let deleteIcon = document.getElementById('delete-icon-1');
    deleteIcon.style.display = checkboxesChecked ? 'block' : 'none';
} 
document.getElementById('select-all-received').addEventListener('change', function(event) {
    let checkboxes = document.querySelectorAll('.email-checkbox-received');
    checkboxes.forEach(checkbox => checkbox.checked = event.target.checked);
    toggleDeleteIconReceived();
});
document.querySelectorAll('.email-checkbox-received').forEach(checkbox => {
    checkbox.addEventListener('change', toggleDeleteIconReceived);
});
toggleDeleteIconReceived();

// ---- Nút Delete của form thư đã gửi ---- //
function toggleDeleteIconSend() {
    let checkboxesChecked = document.querySelectorAll('.email-checkbox-send:checked').length > 0;
    let deleteIcon = document.getElementById('delete-icon-2');
    deleteIcon.style.display = checkboxesChecked ? 'block' : 'none';
}

document.getElementById('select-all-send').addEventListener('change', function(event) {
    let checkboxes = document.querySelectorAll('.email-checkbox-send');
    checkboxes.forEach(checkbox => checkbox.checked = event.target.checked);
    toggleDeleteIconSend();

}); 
document.querySelectorAll('.email-checkbox-send').forEach(checkbox => {
    checkbox.addEventListener('change', toggleDeleteIconSend);
}); 
toggleDeleteIconSend();

// ---- Nút Delete của form thùng rác ---- //
function toggleDeleteIconTrash() {
    let checkboxesChecked = document.querySelectorAll('.email-checkbox-trash:checked').length > 0;
    let deleteIcon = document.getElementById('delete-icon-3');
    deleteIcon.style.display = checkboxesChecked ? 'block' : 'none';
}

document.getElementById('select-all-trash').addEventListener('change', function(event) {
    let checkboxes = document.querySelectorAll('.email-checkbox-trash');
    checkboxes.forEach(checkbox => checkbox.checked = event.target.checked);
    toggleDeleteIconTrash();
});

document.querySelectorAll('.email-checkbox-trash').forEach(checkbox => {
    checkbox.addEventListener('change', toggleDeleteIconTrash);
});
toggleDeleteIconTrash();

document.getElementById('delete-icon-3').addEventListener('click', function() {
    let selectedEmails = document.querySelectorAll('.email-checkbox-trash:checked');
    let emailIds = [];

    selectedEmails.forEach(checkbox => {
        let emailRow = checkbox.closest('tr');
        if (emailRow) {
            emailIds.push(emailRow.dataset.emailId);
            emailRow.style.display = 'none';
        }
    });

    // Gửi yêu cầu xóa tới máy chủ
    fetch('/delete_emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailIds: emailIds })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Emails deleted:', data);
    })
    .catch(error => console.error('Error deleting emails:', error));
});

document.getElementById('delete-now').addEventListener('click', function() {
    if (confirm('Bạn có chắc chắn muốn xóa tất cả thư trong thùng rác không?')) {
        // Gửi yêu cầu xóa tất cả thư trong thùng rác
        fetch('/delete_all_trash', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Tất cả thư trong thùng rác đã được xóa thành công!');
                location.reload(); 
            } else {
                alert('Có lỗi xảy ra khi xóa tất cả thư. Vui lòng thử lại.');
            }
        })
        .catch(error => {
            console.error('Error deleting all emails:', error);
            alert('Có lỗi xảy ra khi xóa tất cả thư. Vui lòng thử lại.');
        });
    }
});

// ---- Chuyển đến thùng rác ---- //
function moveToTrash(folderType) {
    let emailIds = [];

    if (folderType === 'received') {
        document.querySelectorAll('.email-checkbox-received:checked').forEach(checkbox => {
            emailIds.push(checkbox.getAttribute('data-email-id'));
        });
    } else if (folderType === 'sent') {
        document.querySelectorAll('.email-checkbox-send:checked').forEach(checkbox => {
            emailIds.push(checkbox.getAttribute('data-email-id'));
        });
    }

    if (emailIds.length === 0) {
        alert('Vui lòng chọn ít nhất một email.');
        return;
    }

    fetch('/move_to_trash', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_ids: emailIds })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            emailIds.forEach(id => {
                const emailRow = document.getElementById(`email-${id}`);
                if (emailRow) {
                    emailRow.style.display = 'none';
                }
            });
            updateTrashEmails();
        } else {
            alert(data.message);
        }
        location.reload();
    })
    .catch(error => {
        console.error('Lỗi:', error);
        alert('Đã xảy ra lỗi khi di chuyển email vào thùng rác.');
    });
}

function updateTrashEmails() {
    fetch('/get_trash_emails')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const trashTableBody = document.querySelector('.form-trash-mail tbody');
                trashTableBody.innerHTML = '';

                data.emails.forEach(email => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><input type="checkbox" class="email-checkbox-trash" data-email-id="${email.id}"></td>
                        <td class="col-trash-1">${email.sender_email}</td>
                        <td class="col-trash-2">${email.subject}</td>
                        <td class="col-trash-3">${email.local_time}</td>
                    `;
                    trashTableBody.appendChild(row);
                });
            }
        })
        .catch(error => console.error('Error fetching trash emails:', error));
}

///__________Thông báo của việc thực hiện gửi maill__________///
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const alertBox = document.querySelector(".alert");
        if (alertBox) {
            alertBox.style.display = "none";
        }
    }, 3000);
});

///__________Phân trang danh sách thư của các form__________///
document.addEventListener('DOMContentLoaded', function() {
    const rowsPerPage = 13;

    function paginateTable(table) {
        const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        const paginationControls = table.nextElementSibling;
        let currentPage = 1;

        function displayRows() {
            const startRow = (currentPage - 1) * rowsPerPage;
            const endRow = startRow + rowsPerPage;
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.display = i >= startRow && i < endRow ? '' : 'none';
            }
        }

        function setupPagination() {
            const pageCount = Math.ceil(rows.length / rowsPerPage);
            paginationControls.innerHTML = '';

            for (let i = 1; i <= pageCount; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.classList.add('page-button');
                pageButton.addEventListener('click', function() {
                    currentPage = i;
                    displayRows();
                    highlightCurrentPage();
                });
                paginationControls.appendChild(pageButton);
            }
        }

        function highlightCurrentPage() {
            const buttons = paginationControls.getElementsByClassName('page-button');
            for (let button of buttons) {
                button.style.backgroundColor = button.textContent == currentPage ? '#007BFF' : '#f5f5f5';
                button.style.color = button.textContent == currentPage ? '#FFF' : '#000';
            }
        }

        displayRows();
        setupPagination();
        highlightCurrentPage();
    }

    // Lặp qua tất cả các bảng email-table để phân trang
    document.querySelectorAll('.email-table').forEach(table => {
        paginateTable(table);
    });
});

///__________Các chỉnh sửa cho phần soạn thư__________///
// ----- Cập nhật nội dung vào div ----- //
function updateBody() {
    document.getElementById('hidden-body').value = document.getElementById('main').innerHTML;
    document.getElementById('hidden-body-sent').value = document.getElementById('main-sent').innerHTML;
    document.getElementById('hidden-body-received').value = document.getElementById('main-received').innerHTML;
}

// ----- Cập nhật nội dung không bị lỗi div/br ----- //
document.addEventListener("DOMContentLoaded", function() {
    const mainDiv = document.getElementById('main');

    // Thiết lập sự kiện input để xử lý mỗi khi người dùng nhập liệu
    mainDiv.addEventListener('input', function(event) {
        // Có thể điều chỉnh các thuộc tính hoặc xử lý nội dung tại đây nếu cần
    });

    mainDiv.addEventListener('click', function(event) {
        mainDiv.focus();
    });

    mainDiv.addEventListener('focus', function(event) {
        mainDiv.style.outline = 'none'; 
    });

    const content = "";
    mainDiv.innerHTML = content.replace(/\n/g, '<br/>');
});


// ----- Gửi nhiều file và chuyển thành dropdown với thanh upload ----- //
function handleFileSelection(inputId, containerId, countId) {
    let selectedFiles = [];
    document.getElementById(inputId).addEventListener('change', function () {
        const newFiles = Array.from(this.files);

        // Thêm file mới vào danh sách nếu chưa có
        newFiles.forEach(file => {
            if (!selectedFiles.some(f => f.file.name === file.name && f.file.size === file.size)) {
                selectedFiles.push({ file, uploaded: false });
            }
        });

        updateFileList(containerId);
        updateInputFiles(inputId);
        updateFileCount(countId);
    });

    // Hàm để cập nhật danh sách hiển thị file
    function updateFileList(containerId) {
        const fileListContainer = document.getElementById(containerId);
        fileListContainer.innerHTML = '';

        selectedFiles.forEach((item, index) => {
            const { file, uploaded } = item;

            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';

            const fileName = document.createElement('span');
            fileName.className = 'file-name';
            fileName.textContent = file.name;

            const fileSize = document.createElement('span');
            fileSize.className = 'file-size';

            fileSize.textContent = `(${(file.size / 1024).toFixed(1)}K)`;

            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            const progress = document.createElement('div');
            progress.className = 'progress';
            progressBar.appendChild(progress);

            const deleteButton = document.createElement('span');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'X';

            // Xóa file khi nhấn nút "X"
            deleteButton.addEventListener('click', function () {
                selectedFiles.splice(index, 1);
                updateFileList(containerId);
                updateInputFiles(inputId);
                updateFileCount(countId);
            });

            fileItem.appendChild(fileName);
            fileItem.appendChild(progressBar);
            fileItem.appendChild(fileSize);
            fileItem.appendChild(deleteButton);
            fileListContainer.appendChild(fileItem);

            // Giả lập tiến trình upload nếu chưa upload
            if (!uploaded) {
                let uploadProgress = 0;
                const uploadSpeed = Math.min(Math.max(file.size / 10240, 100), 1000); 
                const uploadInterval = setInterval(() => {
                    uploadProgress += 10;
                    progress.style.width = `${uploadProgress}%`;
                    if (uploadProgress >= 100) {
                        clearInterval(uploadInterval);
                        item.uploaded = true;
                        progressBar.style.display = 'none';  
                    }
                }, uploadSpeed); 
            } else {
                progress.style.width = '100%';
                progressBar.style.display = 'none';  
            }
        });
    }

    // Hàm để cập nhật lại input với các file đã chọn
    function updateInputFiles(inputId) {
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach(item => dataTransfer.items.add(item.file));
        document.getElementById(inputId).files = dataTransfer.files;
    }

    // Hàm để cập nhật số lượng file đã chọn
    function updateFileCount(countId) {
        const fileCountContainer = document.getElementById(countId);
        if (fileCountContainer) {
            fileCountContainer.textContent = `${selectedFiles.length} tệp đã chọn`;
        }
    }
}



// Sử dụng hàm cho từng form riêng biệt
document.addEventListener('DOMContentLoaded', function () {
    handleFileSelection('attachment-create', 'file-dropdown-create', 'file-count-create');
    handleFileSelection('attachment-sent', 'file-dropdown-sent', 'file-count-sent');
    handleFileSelection('attachment-received', 'file-dropdown-received', 'file-count-received');
});

socket.on('new_email', function(data) {
    console.log(data.message);
    const userInfoEl = document.getElementById('user-info');
    if (userInfoEl && data.receiver_id) {
        const currentUserId = parseInt(userInfoEl.getAttribute('data-user-id'));
        if (data.receiver_id === currentUserId) {
            location.reload();
        }
    }
});

socket.on('disconnect', function() {
    console.log('WebSocket disconnected');
});

socket.on('connect', function() {
    console.log('WebSocket Connected');
});


document.querySelector('.form-recover-key').onsubmit = async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const response = await fetch('/change_password', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById('successChangePasswordMessage').textContent = result.message;
        showChangePasswordSuccessModal();
    } else {
        document.getElementById('errorChangePasswordMessage').textContent = result.message;
        showChangePasswordErrorModal();
    }
};

// Hiển thị modal thành công
function showChangePasswordSuccessModal() {
    document.getElementById('changePasswordSuccessModal').classList.add('active');
}

// Đóng modal thành công
function closeChangePasswordSuccessModal() {
    document.getElementById('changePasswordSuccessModal').classList.remove('active');
    document.querySelector('.form-recover-key').reset(); // Đặt lại form
}

// Hiển thị modal lỗi
function showChangePasswordErrorModal() {
    document.getElementById('changePasswordErrorModal').classList.add('active');
}

// Đóng modal lỗi
function closeChangePasswordErrorModal() {
    document.getElementById('changePasswordErrorModal').classList.remove('active');
}

// Các hàm đóng mở modal gửi thư thành công / thất bại (gắn vào window để gọi từ HTML onclick)
window.showSendEmailSuccessModal = function(message) {
    document.getElementById('successSendEmailMessage').textContent = message;
    document.getElementById('sendEmailSuccessModal').classList.add('active');
};

window.closeSendEmailSuccessModal = function() {
    document.getElementById('sendEmailSuccessModal').classList.remove('active');
    location.reload();
};

window.showSendEmailErrorModal = function(message) {
    document.getElementById('errorSendEmailMessage').textContent = message;
    document.getElementById('sendEmailErrorModal').classList.add('active');
};

window.closeSendEmailErrorModal = function() {
    document.getElementById('sendEmailErrorModal').classList.remove('active');
};

// Xử lý gửi các form soạn thư / trả lời thư bằng AJAX để giữ lại dữ liệu khi lỗi
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.form-create-mail, .form-rep-receiver, .form-rep-seen').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Cập nhật nội dung div contenteditable vào input hidden trước khi gửi
            updateBody();

            const formData = new FormData(this);
            // Lấy input recipient của form hiện tại
            const recipientInput = this.querySelector('input[name="recipient"]');
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                const result = await response.json();
                if (result.success) {
                    window.showSendEmailSuccessModal(result.message);
                } else {
                    window.showSendEmailErrorModal(result.message);
                    // Nếu lỗi do người nhận không tồn tại hoặc gửi cho chính mình, chỉ xóa ô nhập người nhận và focus lại
                    if (result.message && (result.message.includes("người nhận") || result.message.includes("chính mình") || result.message.includes("Người nhận"))) {
                        if (recipientInput) {
                            recipientInput.value = '';
                            recipientInput.focus();
                        }
                    }
                }
            } catch (err) {
                console.error('Lỗi khi gửi thư:', err);
                window.showSendEmailErrorModal('Đã xảy ra lỗi kết nối khi gửi thư.');
            }
        });
    });
});