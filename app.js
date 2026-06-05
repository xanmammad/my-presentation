document.addEventListener("DOMContentLoaded", () => {
    // Helper to log errors to console and show user-friendly message
    function handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        logToTerminal(`[SYSTEM ERROR] Failed to execute ${context}. Check browser console.`);
    }

    // 1. Theme Switcher (Defensive implementation)
    try {
        const body = document.body;
        const themeBtn = document.getElementById("theme-btn");
        const themeText = document.getElementById("theme-text");
        const sunIcon = document.querySelector(".sun-icon");
        const moonIcon = document.querySelector(".moon-icon");

        if (themeBtn && themeText && sunIcon && moonIcon) {
            themeBtn.addEventListener("click", () => {
                if (body.classList.contains("light-theme")) {
                    body.classList.remove("light-theme");
                    body.classList.add("dark-theme");
                    themeText.textContent = "Light Glass";
                    sunIcon.style.display = "none";
                    moonIcon.style.display = "inline";
                    logToTerminal("Theme switched to: Dark Cyberpunk Mode");
                } else {
                    body.classList.remove("dark-theme");
                    body.classList.add("light-theme");
                    themeText.textContent = "Dark Cyberpunk";
                    sunIcon.style.display = "inline";
                    moonIcon.style.display = "none";
                    logToTerminal("Theme switched to: Light Glass Mode");
                }
            });
        }
    } catch (err) {
        console.error("Theme Switcher initialization failed:", err);
    }

    // 2. Section Animations handled by CSS on page load (No JS needed)

    // 3. Interactive Certificates Modal (Defensive implementation)
    try {
        const certModal = document.getElementById("cert-modal");
        const modalTitle = document.getElementById("modal-cert-title");
        const modalDesc = document.getElementById("modal-cert-desc");
        const modalClose = document.querySelector(".modal-close");
        const certItems = document.querySelectorAll(".interactive-cert");

        if (certModal && modalTitle && modalDesc && modalClose && certItems.length > 0) {
            certItems.forEach(item => {
                item.addEventListener("click", () => {
                    const certNameEl = item.querySelector(".cert-name");
                    const certName = certNameEl ? certNameEl.textContent : "Certificate";
                    const certDesc = item.getAttribute("data-desc") || "No description available.";
                    modalTitle.textContent = certName;
                    modalDesc.textContent = certDesc;
                    certModal.style.display = "block";
                    logToTerminal(`Inspecting certificate details: ${certName}`);
                });
            });

            modalClose.addEventListener("click", () => {
                certModal.style.display = "none";
            });

            window.addEventListener("click", (e) => {
                if (e.target === certModal) {
                    certModal.style.display = "none";
                }
            });
        }
    } catch (err) {
        console.error("Certificates Modal initialization failed:", err);
    }

    // 4. Interactive Skill Tags Easter Egg (Defensive implementation)
    try {
        const skillTags = document.querySelectorAll(".skill-tag");
        const termInput = document.getElementById("terminal-input");

        if (skillTags.length > 0 && termInput) {
            skillTags.forEach(tag => {
                tag.addEventListener("click", () => {
                    const toolName = tag.textContent.trim();
                    termInput.value = `info ${toolName.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')}`;
                    executeCommand(termInput.value);
                    termInput.value = "";
                    
                    tag.classList.add("highlighted");
                    setTimeout(() => tag.classList.remove("highlighted"), 1500);
                });
            });
        }
    } catch (err) {
        console.error("Skill Tags initialization failed:", err);
    }

    // 5. Terminal Emulator (Defensive implementation)
    const termInput = document.getElementById("terminal-input");
    const termHistory = document.getElementById("terminal-history");
    const termBody = document.getElementById("terminal-body");

    try {
        if (termInput && termHistory && termBody) {
            // Focus terminal input on body click if within terminal area
            termBody.addEventListener("click", () => {
                termInput.focus();
            });

            termInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const command = termInput.value.trim();
                    try {
                        executeCommand(command);
                    } catch (cmdErr) {
                        handleError(cmdErr, `command "${command}"`);
                    }
                    termInput.value = "";
                }
            });
        }
    } catch (err) {
        console.error("Terminal Emulator initialization failed:", err);
    }

    function logToTerminal(text, isHTML = false) {
        if (!termHistory || !termBody) return;
        try {
            const line = document.createElement("div");
            line.className = "terminal-line log-text";
            if (isHTML) {
                line.innerHTML = text;
            } else {
                line.textContent = text;
            }
            termHistory.appendChild(line);
            termBody.scrollTop = termBody.scrollHeight;
        } catch (err) {
            console.error("logToTerminal failed:", err);
        }
    }

    function executeCommand(cmdLine) {
        if (!cmdLine) return;
        if (!termHistory || !termBody) return;

        // Add input to history
        const inputLine = document.createElement("div");
        inputLine.className = "terminal-line";
        inputLine.innerHTML = `<span class="prompt">ismixan@pentest-console:~$</span> <span>${escapeHtml(cmdLine)}</span>`;
        termHistory.appendChild(inputLine);

        const args = cmdLine.split(" ");
        const command = args[0].toLowerCase();
        const parameter = args.slice(1).join(" ").toLowerCase();

        switch (command) {
            case "help":
                logToTerminal("Available commands:\n  help         - Show this menu\n  whoami       - Display current profile role\n  skills       - List technical expertise\n  experience   - List professional background\n  certs        - List professional certifications\n  contact      - Display contact links\n  scan         - Run a mock network audit scan\n  exploit      - Simulate a privilege escalation demo\n  clear        - Clear console history", false);
                break;
            case "whoami":
                logToTerminal("ismixan - Penetration Tester / Information Security Specialist.");
                break;
            case "clear":
                termHistory.innerHTML = "";
                break;
            case "skills":
                logToTerminal("Technical Skill Matrix:\n  - Security Testing: Web App Pentesting (OWASP), Network Auditing, Exploit Dev\n  - Core Tools: Burp Suite, Nmap, Nessus, Metasploit, Wireshark, SQLmap, Gobuster\n  - Languages: Bash Scripting, HTML/CSS, JavaScript, PHP (WordPress)", false);
                break;
            case "experience":
                logToTerminal("Professional Experience:\n  - Center for Digital Health (MoH) | Penetration Tester [2024 - Present]\n  - Baku Engineering University | Academic Mentor [2022]\n  - Cargoline LLC | IT Admin Assistant [2021]\n  - AsAnt Group SMM | Web Developer [2020 - 2021]", false);
                break;
            case "certs":
            case "certifications":
                logToTerminal("Certificates & Badges:\n  - eJPT (Junior Pentester) - INE\n  - Web-RTA (Web Red Team Analyst) - CyberWarFare Labs\n  - CAPT (Associate Pentester) - HACKVISER\n  - Red Team Training Program - Xploit Academy\n  - Plus 8+ specialized training badges.", false);
                break;
            case "contact":
                logToTerminal("Contact Info:\n  - Email: khanmmdv@gmail.com\n  - Phone: +994 70 902 10 20\n  - LinkedIn: linkedin.com/in/ismixan", false);
                break;
            case "scan":
                logToTerminal("Scanning hosts... please wait.");
                setTimeout(() => {
                    logToTerminal("Starting Nmap 7.92 (https://nmap.org) at local-env");
                    logToTerminal("Nmap scan report for ismixan.mammadov (127.0.0.1)");
                    logToTerminal("PORT     STATE SERVICE\n22/tcp   open  ssh (Key-based auth)\n80/tcp   open  http (Interactive Resume Page)\n443/tcp  open  https (SSL/TLS Active)\n8080/tcp open  http-proxy (Burp Suite Intercepting)");
                    logToTerminal("Device status: SAFE | Certificates validation active.");
                }, 600);
                break;
            case "exploit":
                logToTerminal("Running privilege escalation exploit simulator...");
                setTimeout(() => {
                    logToTerminal("[*] Gathering target environment variables...");
                    setTimeout(() => {
                        logToTerminal("[+] Target Vulnerability identified: CVE-2026-XPLOIT");
                        setTimeout(() => {
                            logToTerminal("[*] Injecting local shellcode payload...");
                            setTimeout(() => {
                                logToTerminal("[+] Exploit executed successfully.\n[+] Local uid changed: root (id=0)\n[+] Access level: SYSTEM_OWNER", false);
                            }, 500);
                        }, 400);
                    }, 400);
                }, 300);
                break;
            case "info":
                showToolInfo(parameter);
                break;
            default:
                logToTerminal(`Command not found: ${command}. Type 'help' to see list of commands.`);
        }
        termBody.scrollTop = termBody.scrollHeight;
    }

    function showToolInfo(tool) {
        const toolDB = {
            nmap: "Nmap: Open-source utility for network discovery and security auditing. Used for port scanning and OS detection.",
            nessus: "Nessus: Vulnerability scanner used to identify configuration bugs, missing patches, and weaknesses.",
            burp_suite: "Burp Suite: Integrated platform for performing security testing of web applications, proxies, and APIs.",
            burpsuite: "Burp Suite: Integrated platform for performing security testing of web applications, proxies, and APIs.",
            metasploit: "Metasploit: Penetration testing framework used to find, exploit, and validate vulnerabilities.",
            wireshark: "Wireshark: Network packet analyzer used to capture, inspect, and analyze network traffic in real-time.",
            sqlmap: "SQLmap: Open-source tool that automates detecting and exploiting SQL injection flaws.",
            gobuster: "Gobuster: Tool used to brute-force URIs (directories and files) in web sites and DNS subdomains.",
            theharvester: "theHarvester: Tool designed for gathering subdomain names, e-mail addresses, and open ports using OSINT.",
            wfuzz: "Wfuzz: Web application vulnerability scanner designed for brute-forcing Web Applications.",
            ffuf: "Ffuf: Fast web fuzzer written in Go, used for directory discovery and parameter fuzzing.",
            hydra: "Hydra: Network logon cracker that supports numerous protocols for brute force attacks.",
            hashcat: "Hashcat: World's fastest CPU/GPU password recovery/cracking utility.",
            dnsrecon: "DNSrecon: DNS enumeration tool used to gather DNS records, subdomains, and zone transfer details.",
            kali_linux: "Kali Linux: Debian-derived Linux distribution designed for digital forensics and penetration testing.",
            kali: "Kali Linux: Debian-derived Linux distribution designed for digital forensics and penetration testing.",
            owasp_top_10: "OWASP Top 10: Standard awareness document for developers and web application security, listing critical risks.",
            owasp: "OWASP Top 10: Standard awareness document for developers and web application security, listing critical risks.",
            ptes: "PTES: Penetration Testing Execution Standard, defining core phases of a professional pentest.",
            bash_scripting: "Bash: Command language and shell scripting used to automate tools, parsing, and server configurations.",
            bash: "Bash: Command language and shell scripting used to automate tools, parsing, and server configurations.",
            wordpress_/_php: "WordPress & PHP: Analyzing source code, configuration files, and plugin security on WordPress sites.",
            php: "WordPress & PHP: Analyzing source code, configuration files, and plugin security on WordPress sites."
        };

        const resolvedTool = tool.toLowerCase();
        if (toolDB[resolvedTool]) {
            logToTerminal(toolDB[resolvedTool]);
        } else {
            logToTerminal(`Query info for: ${tool}. Detailed description not found, but it is one of Ismixan's core competencies.`);
        }
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
});
