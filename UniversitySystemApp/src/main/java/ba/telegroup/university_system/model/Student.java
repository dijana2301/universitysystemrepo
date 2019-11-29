package ba.telegroup.university_system.model;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "student")
public class Student {
    private Integer id;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String address;
    private Timestamp createdAt;
    private Byte active;
    private Integer studyProgramId;
    private Integer universityId;
    private String numRegistration;

    public Student() {
    }

    public Student(Integer id, String firstName, String lastName, java.util.Date dateOfBirth, String address, Timestamp createdAt, Byte active, Integer studyProgramId, Integer universityId, String numRegistration) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = new Date(dateOfBirth.getTime());
        this.address = address;
        this.createdAt = createdAt;
        this.active = active;
        this.studyProgramId = studyProgramId;
        this.universityId = universityId;
        this.numRegistration = numRegistration;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "first_name", nullable = false, length = 45)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "last_name", nullable = false, length = 45)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "date_of_birth", nullable = false)
    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Basic
    @Column(name = "address", nullable = true, length = 100)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Basic
    @Column(name = "active", nullable = false, insertable = false, updatable = false)
    public Byte getActive() {
        return active;
    }

    public void setActive(Byte active) {
        this.active = active;
    }

    @Basic
    @Column(name = "study_program_id", nullable = false)
    public Integer getStudyProgramId() {
        return studyProgramId;
    }

    public void setStudyProgramId(Integer studyProgramId) {
        this.studyProgramId = studyProgramId;
    }

    @Basic
    @Column(name = "university_id", nullable = false)
    public Integer getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Integer universityId) {
        this.universityId = universityId;
    }

    @Basic
    @Column(name = "num_registration", nullable = false, length = 10)
    public String getNumRegistration() {
        return numRegistration;
    }

    public void setNumRegistration(String numRegistration) {
        this.numRegistration = numRegistration;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(id, student.id) &&
                Objects.equals(firstName, student.firstName) &&
                Objects.equals(lastName, student.lastName) &&
                Objects.equals(dateOfBirth, student.dateOfBirth) &&
                Objects.equals(address, student.address) &&
                Objects.equals(createdAt, student.createdAt) &&
                Objects.equals(active, student.active) &&
                Objects.equals(studyProgramId, student.studyProgramId) &&
                Objects.equals(universityId, student.universityId) &&
                Objects.equals(numRegistration, student.numRegistration);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, dateOfBirth, address, createdAt, active, studyProgramId, universityId, numRegistration);
    }
}
