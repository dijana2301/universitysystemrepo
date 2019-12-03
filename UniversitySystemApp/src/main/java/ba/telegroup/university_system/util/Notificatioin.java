package ba.telegroup.university_system.util;

import ba.telegroup.university_system.common.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Component
public class Notificatioin {
    private final JavaMailSender mailSender;
//    @Value("${spring.mail.username}")
//    private String username;
//    @Value("${spring.mail.username.personal}")
//    private String personal;
//    @Value("${spring.mail.from}")
//    private String from;

    @Autowired
    public Notificatioin(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendSimpleMail(String recipientMail, String subject, String body) throws BadRequestException {
        sendMail(recipientMail, subject, body, false);
    }

    private void sendMail(String recipientMail, String subject, String body, boolean multipart) throws BadRequestException {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "UTF-8");
            helper.setTo(recipientMail);
            helper.setSubject(subject);
            helper.setText(body, true);
            helper.setFrom("dijana2301993@gmail.com", "University system");
            mailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new BadRequestException("Exception");
        }
    }
}
