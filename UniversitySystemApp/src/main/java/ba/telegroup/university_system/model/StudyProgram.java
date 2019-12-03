package ba.telegroup.university_system.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "study_program", schema = "university_system_db", catalog = "")
@Inheritance(strategy = InheritanceType.JOINED)
public class StudyProgram {
    private Integer id;
    private String name;
    private Integer numOfYears;
    private Integer ects;
    private Timestamp createdAt;
    private Byte active;
    private Integer collegeId;

    public StudyProgram() {
    }

    public StudyProgram(Integer id, String name, Integer numOfYears, Integer ects, Timestamp createdAt, Byte active, Integer collegeId) {
        this.id = id;
        this.name = name;
        this.numOfYears = numOfYears;
        this.ects = ects;
        this.createdAt = createdAt;
        this.active = active;
        this.collegeId = collegeId;
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
    @Column(name = "name", nullable = false, length = 45)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "num_of_years", nullable = false)
    public Integer getNumOfYears() {
        return numOfYears;
    }

    public void setNumOfYears(Integer numOfYears) {
        this.numOfYears = numOfYears;
    }

    @Basic
    @Column(name = "ects", nullable = false)
    public Integer getEcts() {
        return ects;
    }

    public void setEcts(Integer ects) {
        this.ects = ects;
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
    @Column(name = "active", nullable = false, insertable = false)
    public Byte getActive() {
        return active;
    }

    public void setActive(Byte active) {
        this.active = active;
    }

    @Basic
    @Column(name = "college_id", nullable = false)
    public Integer getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(Integer collegeId) {
        this.collegeId = collegeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StudyProgram that = (StudyProgram) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(numOfYears, that.numOfYears) &&
                Objects.equals(ects, that.ects) &&
                Objects.equals(createdAt, that.createdAt) &&
                Objects.equals(active, that.active) &&
                Objects.equals(collegeId, that.collegeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, numOfYears, ects, createdAt, active, collegeId);
    }
}
