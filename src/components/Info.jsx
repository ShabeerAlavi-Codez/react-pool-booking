import Accordion from "react-bootstrap/Accordion";

// Information about the pool at the bottom of the page
function Info() {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Services</Accordion.Header>
                <Accordion.Body>
                    Free swimming (with a discount for students and UrFU staff). The discount
                    does not apply to swimming lessons with an instructor and aqua aerobics.
                    We also offer enrollment in children's swimming classes. The classes are
                    conducted by experienced swimming coaches.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>What to Bring</Accordion.Header>
                <Accordion.Body>
                    Visitors to the pool should have a medical certificate from a doctor
                    (therapist/pediatrician) and a swim cap. Bring a swimsuit (trunks or a
                    swimsuit), personal hygiene items, a sponge, a towel, and slippers. It is
                    mandatory for everyone to have a swim cap.
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header>Contact Information</Accordion.Header>
                <Accordion.Body>ul. Kominerna, 14a, (343) 375-93-84</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
                <Accordion.Header>About the Pool</Accordion.Header>
                <Accordion.Body>
                    The pool's length is 25 meters, and the depth ranges from 1.20 to 1.80
                    meters. The pool is divided into 6 lanes. According to Sanitary Rules and
                    Regulations (SanPiN) 2.1.2.1188-03, the standard is 8 adults or 12 children
                    per lane.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default Info;
