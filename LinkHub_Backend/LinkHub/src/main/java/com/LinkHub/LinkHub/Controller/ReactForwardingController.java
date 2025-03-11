
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactForwardingController {

    @GetMapping("/heydontdoanything")
    public String forwardToReact() {
        return "forward:/index.html";
    }
}
