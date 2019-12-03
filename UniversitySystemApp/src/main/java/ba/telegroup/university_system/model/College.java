package ba.telegroup.university_system.model;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "college")


public class College {
    private Integer id;
    private String name;
    private String address;
    private Date dateOfFoundation;
    private Timestamp createdAt;
    private Byte active;
    private Integer universityId;


    public College() {
    }

    public College(Integer id, String name, String address, java.util.Date dateOfFoundation, Timestamp createdAt, Byte active, Integer universityId) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.dateOfFoundation = new Date(dateOfFoundation.getTime());
        this.createdAt = createdAt;
        this.active = active;
        this.universityId = universityId;
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
    @Column(name = "name", nullable = false, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "address", nullable = false, length = 100)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "date_of_foundation", nullable = false)
    public Date getDateOfFoundation() {
        return dateOfFoundation;
    }

    public void setDateOfFoundation(Date dateOfFoundation) {
        this.dateOfFoundation = dateOfFoundation;
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
    @Column(name = "university_id", nullable = false)
    public Integer getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Integer universityId) {
        this.universityId = universityId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        College college = (College) o;
        return Objects.equals(id, college.id) &&
                Objects.equals(name, college.name) &&
                Objects.equals(address, college.address) &&
                Objects.equals(dateOfFoundation, college.dateOfFoundation) &&
                Objects.equals(createdAt, college.createdAt) &&
                Objects.equals(active, college.active) &&
                Objects.equals(universityId, college.universityId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, address, dateOfFoundation, createdAt, active, universityId);
    }
}
