import React, { useState, useMemo, useEffect } from 'react';

/* ---------------------------------------------------------------
   Brand tokens (Align Advisor Consulting palette)
--------------------------------------------------------------- */
const COLOR = {
  oxblood: '#4A241A',
  nearBlack: '#2A2723',
  tan: '#D2BE9E',
  tanLight: '#F3ECDF',
  paper: '#FFFEFA',
  white: '#FFFFFF',
  sage: '#98A77E',
  olive: '#5A653F',
  taupe: '#A89F8F',
  terracotta: '#CC8E73',
  error: '#A63A2C',
  errorBg: '#FBEDE9',
  border: '#E4DCCB',
};

const FONT_HEAD = "'Constantia', 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif";
const FONT_BODY = "'Corbel', 'Segoe UI', 'Calibri', system-ui, -apple-system, sans-serif";

const BOOKING_URL = 'https://www.alignadvisorconsulting.com/booking-calendar/15-minute-intro-meeting';
const SITE_URL = 'https://www.alignadvisorconsulting.com';
const CONTACT_EMAIL = 'info@alignadvisorconsulting.com';

// Align logo, embedded so it doesn't depend on a file in /public.
const LOGO_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAACSBAMAAADWc4KQAAAAMFBMVEX////+/v3//vr+/vr//vn9+/fVzMiAZV1NKB5LJRtLJBpKJBtKJBpKJBlJJBpCGhByH9K5AAAdPUlEQVR42u1de3gTZbr/TZJSbk0mhV4EQsOlulhoB0G0VKAKLkuhUFDuuFzcAy24CnUPSFlXYI+0YVdALraACgp4Q6FQLscVaLFAj5hKSlOw5WiTFmgbpDNJqUDJzJw/ZpLeZiYFsz7n8en8k2Tmm5nv973393u/L4QZv81D9RvFBY3iVQv1K3aFtUBN/TrAzOSvhqyQJroNAVtIA/oh/nggoSBj7DBbQ92vAsvsnGYEZ4PKCID7No8Y/W8FVlxlf1j3K5CMzZ1uzGBo4Yce+rEUt9PZjfq3AWN1GbtTVlfK3+vOgx5DgELQwBiFl5wAQaop1sIzkKCF+fbSDLp8v7dHz+sJ/SLjN6dHN3sTQaopFEJeDN15gB5DWAsNdKeUgLljtEmHnVZ54KFG4EcA6AugTIFphwCcDVAZAW5Xy46Zxz70t7LsgCT2gKCmn2MPIGRy8KLe/+jubaqmgB9JBiTTV/Y9agrg7DxURqCsTpFigyJ0+llBsixR5GCghx48AxoIlWda4jNAT5A0aICY36Jj5kUZP+4MSPrWNlUPPUDzN7IjqZ9yA+YHp5ee8Tyyy24QJPQ0gEA2Xrq32t2AHnpa7IyCVrSeYIJ62gyy1101m4jnCRKgccUSsF5+gC7V7A5I0gO0+yACV1tb4ir9YOq9/dOmE4uMAFB6MNSxf+pUdkcA/bvFWwQQRdUmPG7UAzyDbpukeeicfRPUUwiSZ65Y8MogJXWvgg51NeuL5a5rw+ZbzeUAEDz6UmqCLCuquUcmE18xANHvOXW/FrjGpp8/+vy9o4t+t5QzfwoAoa8hI2Tnsz9MvbF90bo0AdnAONtuw1cMAKKb621pE6QNm39klLkcIPonddD6sGMkV5G/W/bqwNDwmbp+BEkDeSvWvkcpNOTfGAWCh/3rxa9bmonxEx+fPzvq3rFX08tM+iFjAIDd7pzxkH7Hs4WqqduHcX/dEg9AXbCFOzwUJANw2nVBMi+5w7vUYwieUx1bmVasJGPF1zdqVUpC5i64nlsLAP2CP9ykZHnM82bTNgDE0A+2NpUQ9tyMlBKD7mjqm00UBWCuT12x/vnvMOTGuRWr9lIA2DOLZzltAIB+F+3SvGgOrHrDAEAVNHHl1nioF8p2p7r+v3V8JAKNsrzac+ZSHQAYBhYqWtSeX/B3qwFE9yptJvn5KctORlaef/XNf44Jb3K6h2Hf6tvvPl1ddStuN8Y3AFAZDgbUCIbOFXa3XLJHPboNo/XVgOqnL7bGQwlY90kZOnTmMhyyLfg7lQ9VA6oro/XhitaS4T8LBBBmbDZK7omL9z1eMXDkWxueaTFiffesrv8whuF/ittlpMOFMUzWCe+MbJjbID3OX2m/uQ0MeurSM8oGOv/ng7VQ213ylgz5RS4LfLQBAHe0zgConGlN+Zo9V7Ux0RJzrnq9BLlPvpJ8lgXUUWGpdYK3sFLkRbW9bg8lZ3gN3pcohS1XegPsiPQ8JfUiukE+HRwAIJzaZqFDclmiRX0kebsUG4/eljmQAtiS949YAEB9XEeK45GwjpFx6LNmUyCcKZRyPOZOLrYACGJ89rrX0/Y2OnBzmgx119+nnLUgaspKacX8VFb/HADQL6G8Yyh8q894Se75IRWImEz4CFsI/qIBQEmBXZ7PyOsXAehCGLUvggm04pucOx64b4RNfTZtq7QnoY6lbrgs4J3eZ9jUOQYAKB+XHiR9T2z0JkPXYItamWLnViUCAGhCiRUZAFDl+2TFUS01WdeU84k2DHomJUkuUsx8OAfoNVnkBm33SvtsCgC4W9+/RMq8hgQ65PugmJYGwQPs+HUy4wOAA6NtGxPyXknzEOz2PgNU6t9tlX14LPUtYSHDcoQG1JcM8Y7OAAC2IhmSEfY4FUf6yHm4Z+07kmgEwDOkD6XQhsPW6vHjyhIB4vDKePngPrO/yqOeAHcSECiSLK5UWsrUx0k4faUGSk6RqnURQUDJcYXQpc3IWnnYw/cZgKgEeYIBsTHaiKMjdOIvI+AWSVZif4IbJS0at6wTdMoUczniZhAMAOiu/hui5rr1iYDqmpFUEsyPZg8mPEqRB8DXCCRjE0qXyN3jjFemGDtuVQD5zmyXBezwPUHx/sblTtYaAOJivpJlV7v0Jc054pSHZMcieak+kT8fxUBekWJ878OHVqpIACBqX/A7wQr+OglA1EJljyX2zcLJzUzkU16S2SbIKDOPSZEDdnnjxCnE8HU5AKw7dH5P34y7yQFAcJ4PKzEpLKcZA596R/hdsr2/RfIGxlcmmLnCPrKFFxhBt83mZ2B8730WQH0szaicpv5E10IGo7wke1UqLOOTfKW43cn157Sk5pPZFMAOd/kbWEFaouDc+ADGhP6xuShpvCTLTJIg2SCjV03Lyli2cwkFJqQCAFHzgr850QkAUfMrfTQkg3u1DJS9JFt3U3lQ5IZ0/MIjQOyaIgDWXX4WMj5irwUAwg75aPjo9D0tNaWHZPUZrzwIMC2DYBsAIgkAr91m8SuwyxtiAKhKQPpoqP5Xq8hrYJVAsvJxivGUjB1zz0omPrECmqwulAVcnIv3KzDmSu9agLCnFftq2Xp+Qp23PMYAgLuVZbfeN8VKNpKTBSaPrADgLE30q4ilOBlBdzzI3VGix2iPViSZSs6fCt8KAAOWFQG4ejDCryLGH7EB4MkHcjQ12cNyAIDlvn/pfoGx4yqv9Ra8DtVEI8BHZ/pTyOp3CdIy+cGsSNwzAskqTimRTCWttQ5fFJxPdWYQCXA9bYwfgV0sGwEACMx5oNs1xx8WSBanRDJJ5XH55IQw0UcjIw8CipnuB1EeZJNM0P0fsVSZywKgxPakTPQiRzHmCu/x0QakFgGoOOBHtciOFD6dD/oAIWkAsONloxdpYO7k+mNppCfanmAE+Jj0PP8hi3IxAFRW8kFJNi51PAUAJe9n5t2fjGXrecoTbUeQANfTjzLG8zk2IctIPaj2yXw8Rww4J9wPsIJV42ds9fogofkAiqv/7P8oes4DD01s6gSRZAF59wGMpAMaQ/aoZQwA1UE/Chnf4vMBpCyrf6VAss2JbQfmnrHvcArVmNKaQwHseP8Jmcb2y/JAABC71mYUohejpc3AAi6QTQJy9XEdAPD+E7IiP1BfkzU7WCDZcrbNduxre9wjOY3xXdDyCANgLbBb/QRM9cAGrCnJkrUjbFBIDmqk8lPnNtQ2iRP0AEDQhP/Kj7QAEOGSu1wosArV+GOIBMmWXLUB4OUS+Ropf0rV47MmJ87NdlnAJsjM/T6A31FrtAHg4uWE7PdG4EecMDMAiDHBRoniEKBTutYAgKvPkCaZRsKfGh8RuKLpmeUVAMD09BfBOGXlQXwKAAFThHxI6adAwITWJQmDP5ntskB+7kUj4U+h42vN35Rv8DGd9EuUfitRiPn70SQQZLr4mwYICZ2uZoXkKVcvHXC2AsYmz6k3tWgz0gaA9lumW6UcrtgeCdmJPuXeYY3PWyhlbQdViSTrLUkyTWuH53AXorna4i9qATbBX5luUnmE1Gcz7gbX7oz0iBWTt/A1qYSUOnvYKwYAnOH7D6xtAFawP1HTkkvcThtAOGb5qXgxWPlyjCks466+jBUtb/SLmduHSgac1HmXBUAxk64d5RsYWaR+pEuLNjW7tID12Earn3SHS6voeIxhTWGm9L+NtAGA+thd0xiZ6CVytQEAG1e62+oTmHvGQuLjFnPlbsMmLQDdNn9VZQrToPL+h3pMoWmlo0LwVf9QKlcKOc5oJiwASuxPtC6JawlMU04+4z7RQuzmTaRtYIf7KQk3MHY1AFSU8EppN9M6YcYIwUfiZaOX/tli9LLpKuMDWL49LrzVLGNmEA/AWbrGL0ImJuwJZe/z6YoJTpuv6CXmR9oG6ekyVUt/yhnQepaRjLT5MwnXJre+sWJFyRU2iK5w6+kyVUt/au+hlFaSNGBZMQA+2s+Zbl9mwXdAEZsuZP9LtkdalIGVbIieIjGgqokAuJ4uxj8ES2xLnEmGFPl+VJaQJWQTUgcpA3NdMTyyRUKxBlEAnKX+yQ/YxWSHMktyhO80lrrzOs90GWVRAsam1F/TSrF2iAvAVf8k4dTHRRdnqyJnD0xqgyxSstNlzbUiz2WrpCbyY6N1BoCPyQzyiyUjXQA4o0qZs41tGaRTgl/VOuBsDqzgC28KuAUzT7wAcEo13feD6+e9WgBRTNCDeP/NjyjRr2oVcDZnRfIGH5YjqVeDKACVNX4RsgHLBOnxhyrSZEbmQIheXpKXMfeMo+cmSluPEBsAl58y3aLwcP6IFjwpxvIezfNozYAR5YwzSlKKYtcUw2+ZbiFtjrobg/xBsqz+KgDgujUv9msmY+fs4w0yHjwRUwtwPRl/JD7UxyMqAFSc2e0P8sfGCPkquzM9aIQ0xdiZTrlaGU3WQAqAtfolv2SpQioAgCfgF5ItIQGA7dVsuqwpxXjdXuJTuXkwfQUA4uCH/uhL1KzVBoCPWWfwh/XoJMYBVtuTDYMkgZWcJFVy2iF2kc4AsInS5abk/QrZRNoGrqdf9CIGfykkP9jxpZs4SVZ03YhrnGVpbckAgGXIB3q5sYWQGUj4rRhBXbtc9Kvez7RJAWNTKglSnpODKAAlWXP80ZcRC3P8GAdF9fXWZxqlgPHc4aNp8qZFz0gJPA8A3P3qbXefJCMA3X3EQYRvI42S9yWVR8H+pMPyBni4IGQJzYVMaO82KlV7ua1Uy35psnqy8F+yITbmO9oGgE1YKkUx8ua9+fJLHkRSEbXxrdUGragELo9o7fgFLcy53zjIpqTxewspPeu7xtbA3DP2IUy+8kJzaTYFwLpjYCu/xYdue/KIBTjcvF8D+06g7i8O0ij5PLHrhEiaS5KgWMlG8qzSPP7XwjX+lqUlxVSKEUb+dhfDtxQRTWb/CoBNaLuLZqEV5EwjRtKwSABzOeKdKZSSu/A1ADZhS1MC3egNQFWuMPBdk+1SkUjs2iIj4Cy9D0+GVOBGTyQt4VK5U64xii5OlBhs1DQxPgxIAHYl3XZ8wxEpPtBkLQkGrh641la9qKolcUS2MSVWMUoAI7hs92TF5VLEJAAo2XVfxsecYtYvpiSixuHph4xgEzazbdTvDBujk19hpM5+OEcmNXDu40QuLF+BFYljXSkLJDPd8pzoDnz9SBM3rWlns5aUACXHXTLL92A9oWt+CxfNyI4C4qhvCYsUxdiUSkY5k6euEJzo4U2TcOLXCpl72IIZ/zthMoESMUDZ2/hudaf0ExTYcevcMve6boxsNmgMghQj6f6V0qzIHbb5Et4ACwCom3h4whorVndUmvnd55JT6viwPVDROgB8s5qKwVl/yQHq0/9DWjGyI50A0O+o6GGP9GFXYtc2180eYOfSEn2Vow2aXAEAFw94hYydLdTAxjGSrzRfTnl5HweSASOMvrEpsdWxf5/9GH5IWPKS5Kjwj+61AOpvF6QJfmBUHcPUJCkZ6ThSApg7+RqDq8rhh5sigGZFOjx/xiZrogtPLnryz+8lVlwjSbEBF9WCe37/+WMoeT/9KYsUE6dNAtRRY1/bI77qsO3qwV6KRjpHQnkUnMzVgmujH9o468ILqYLijqaWGQU2dyyVUfphkkVddKYYCUUC9OaZhXGBy/+ZZElIJzu1fteZxb1ioI46ZqoRdMul73wVRxOfCmFZM4qxE6+MBAa1LfCzHvDUL5VsFBehHUCzPDtrPhm6ouOKb/ZOsQAED3fvIzYAYO4246VbX6598TBVMvz7sV1b0Czo5CspT9vUUcdWpogj5ixLBK8YDai5YTmtKGZ5YZ+h1YDKHWzC8h5exWURzqTPPORhYxp4fBFMtfTOkInfAYYhBMALK6CvFWxqNnRDt212700szsOTc95uupWMuX75ir0j+3U5tmLlXuG0e9xKAlxchUExd/ovlaUFsJ/TEi1AXbXpalto5jE+7uQ5YvNbGeRyrpwm9MJ2PqWv8fRO1dSbFgDasD1UwcloWtLgPZX1Dr83idoOZvk3J8TdjdgLzmkPrVg/pe7esdTXN4uxRNELRwxAcaDJqhiW5TbhTDMA81ytAYDabmpQ2AzB/Edx8lQ1MGamhoH59u03xBFU9XqE1Ack4adc8Axo/ka26jn+OwBAdEzQiEunRe6PiW6RMnEXJL+8cyr2T+u7yPjjCRoA8adgZJTvmIr90/r91z/F7pjHrhHW/pvcTytotxjtiMoKMYdPmAE2dHN+LQBEh2/dJBtCmwMvnRQJpLaXfhFvHhs+00t69RX1c0Joxn0BIJK6KVpFlT7BcPNlrTgAMYG7W8wDuy/PeHlnSPxX9fP1+ulGAPgml3bsnnove9qA19/y4qoaZQCA6MAPtyikj/PtFcVNgRVXvSEK9aEVq3fJeDhsaPgcrzW/F761cFhG6dmmbW9+xwDBj7Xcd+B05e6Fy655fuUtbrmexX155t/Ksh837sc0EnrwDP+tJXLgwQ7zvRvLgB2WUVovfM1+bfUFeWCFL+gi6uxeYGxMsjclG/DqfJkJ9CJHaZPELbGqT8357LaomkCn9bMm++l0WBHRYuTYM6kZ5Y7skHj3QQBA8GP/awtYoG+yFVBRaZn3VR1S58vP8LNkuuva18WNyqPDQoAgQSt5LSq+w0IAerHY9KcXM0MXtmFbCBBEV1p4PEADPDOppZp+yjSjx4ZQej8APQ3Unp48Vp/OmRr3ZFHxocITeAY8Y5Rf2qA+Frnh2SbKo2hB4zVOnhWbuWLcuwvfX9AWinG7Bg/c623JfT5EYujM9akw0aInqUdoKrfT2VSLDbYEe15epsmllNTHzPC/MI3KI4/0PpSRVYuFAO1NxQFDLPEn2mIbiNEgIj73tOw+uVxy1C44pxkBzoa+AH74vMV+Yxaq0NPBoW7FjSjyrzcY4hvV/f+Ho5AGQQ5hLTQIpW3ffExksDGeaJH4je2Ime/ZH+u3tiPm8Hz8NoF5N/P7ze5h2g6sHVg7sHZg7cDagbUDawfWDqwdWDuwdmDtwNqBtQNrB9YO7LcGTNjVgC0stAhfLJ6TwgVzodiOPWnxtCxser/5pKfBCU+DxpuFa4UW8Yy4SriwsFB4SCFaXBDf4etoUyZYn0sBIEi4s0cD0LvrhJMqHQ3g5HJOmHl0X55XlhMPYW/uzxvT7yenGYWVzN4GfZhcSviLiMLf9/7naAB6ngFB0sIXeLb3pj0XflKD0DEAzGONjfNLvxQYmzu5DkDXbAQufSsexFcBowA293nGsOt5Bu4nMpxv7qIA9tLM1WEpVoD4CghY6p22cT+R4UzfMQRgL818I3zxHgo4QTzHsLnizemeZ3bNfp4hvr0VD+ERALpTxFchMXDnjQHM9aMAd9iXtrCUtqzHVtjv3nO4YzIft4TD/fA7VVe/W/Gv8GLXdT7cHZM193pE1lwHzh48fKhquQMonrl4q+772+HId1yuunbhFXGffPbyxxd3XU/7MhyW2S9t0X3ftQfyHZfnVuk+mutAyfHzH1z/mwP5Dq6q1yNZcx3FjiraCOSXlVdVVVWF0VfKtHT3mHfoqjrHddqIs5bT7+qqpXfyv28Zs174LIcBgEN60rQOeHRZzQgUlRN2AgcBNvmHJ5a9n2kBS6XUr+icMQfAPb2e3OBdzzdjY9irNW8CCEipW6HLmAfA/UV6njEPYGeeD1v2XroFuAcA2RC/gNTryUN6PSf+3l/6Z9wD4E4pDVvR+X/aUr2p8d2k7rP/EApAgrdzZIbTyhMHd1t/3hGWMwIkAP5MNRpsBvCPfmRaehfpQfEgHlqNBk+F9rmPX8xE+hqn1T1jkWnp3XvrguKBBUxnxAM8d/wO+NpEseqHBBAAAHh0Hm7nbMcPTD4BAKGcUHxbcup4Ne5oh7VhCX0bgMEZeXFxHQD67ttrb2YGDbJPIgAmAgADWAtnmLBuwfriy18uSjEFRl6dVQcepsBIh1ApwI57fbgJyywESk4uSDEFRhavqQMfvMkJAASmmLB23qBioQKEaZSQ7czLTM3uMWJpiDMoEzwAlyPZhMClbalq13j1qIT8UULPCpaRwi4FxOjMIIZVHw96p/O4gll1Qllk/Ncbdm6mKsHQwdvGdO2t32gFQHj/9oGPOLznKrPvsT2U60bYtjFdI8jdVsDlmYnm/3Pn24MlqvaHugF94yYDBptRGKSBoAr71Y9qEzDr/Ep94yxsk6NXsdCzQ8QkzzyiNsRhAIKYhohDHwq6KarPgVXpnI0GecmgAxNBAgCmGZd5x58EA2pIIcBEBMEpkKBD5/SZAHjiwKp0zpbrk7OWL9i0BkDEoT1W4k8VBpEUbisrSxIN2LhtE72waKC2XPxG1guszE+u0r3jWU779J4RdSM7Zo3j9SJWomruW3ToKpodUUDGgCBoAKj5lLdHe2hCEAB2DAEZwAGwC6uAIx0AoLn0ylu0fo1viVGd4gDw0ANd/gGV+K8hYSHNza2HPKqGOmhwcXbBZaln8cShimIAl0+GZXfxVuOSNHDv0R2bMqaLtbzq3C16h0llGMQyoxhRAeB/sjDdW6lilNK+qaQJAMx/JxwbAn0vIwscvxmCFHaN+MLYbVIdABCfyK0KC9BRGkQTelL6srA/K3ODXPpzmqfsLDcEAHSqG9764acyTaVkaZrllu7QKM+OY0+MdfT21gZZBDXRFCZQJAgZlWkqDfl+pU+Ly/W3eTgEgz0VuF/XXJNufS/CAA3U1VlyT9tFAWzvotuv8VlihZKqVpVPaT6ZtKneIG6KzGrGmcamk7vVX7tVFkpcEhG+ep3DMxSEjgeI+bso5p6LB88f4gGgoMdqG4Du40wha3Uf+GTFe8v6JtMgCB3qPtp+WywbIW8HSrfmO5HQAI5P5VzEIQCQ8EmRTTQKvPn2TZIBmC41ziXiKJ+r6hT0TUcdAB3TAEu0sJWsaZneU6wFGpaBZMqr+SCZzjfLRdHjQiqNQPHlTkH37F5GJEUPWeJf4VQjAag/npTJjthwRzz36Dy5cWgohgZQK/2LHXgcXgP8sC2mK4iAseF/NOgA8ucK72bTpP1u2i6jE9CGXPzo3bFpMwTZayxz/WRW+qwzs3ZvrrMsfPr6u2PTkj8YAuBeKjkJQOeatF0RNgD62llnogUW+xMjoaMzg+oAMF1s//ggdT7pNXYyne5O+TbQJUHJK2B722V5CjHf5taolliBAdPnLbgKABQwYDrZOzWdBKJmaVelZ2xbD0ANzaW54r4EakRuJlNeW2DHwD4jV6VnnE1QA2o3YZ8EYMAMXfe16U4gNlpvXLwieS8F8DvFPwIUuq8W3kP2tXUGhi8ie6em73vRY+x+iRN85RR5vqSYYCJCw16hKz6aXGQEuPBZ48uN4MOWrnTw95hNV9f/xR6uOhC18WrZyNdVqKA7Blb+zIh/8NRtcmn5qXf/YDOqDmg2XC2LfFOFChrkD9yelQ6e7rDp6vq/2sP5u87yU+9OvW100Bt0VdWLHODC1qx0ABVVHXWh4UtXBo2b8qTOyHP0pqvr//Lp/IZf7t276BDysYjBZ6ffDa/u1HXcys4A+DsNBl04+PDqBIfq/MpqDF2nAnrOunOn65OnjXDRAWEdoXpWUPGqA+Qd4pnXOwM9Z9650/V33xjh4gPCOqJPgkNlWVaNoSZAVdjxDvHMf3ZG9e0+nTp1SnCAD68Z0AC4bocEhoVVJ9jvNISEhau+WVmNZ1fbY30D8xmPscPK6gD1IAuK5wENghInHiurA1C04D0K7KV5wFvxAE6nAqW3ADa0RzEb6nEP4A4zgtvYuoHxPQrsuaXAe5RQXMftooBuRlEdV068AIAd9gMD+5T3qKIFDcUQ2m96+YI/Ak2zhhLWWbK5gKeI8ER3CgCbNxqA+3R83mgAYPOM5d0p8RazxqvazM4Iu9Agt4/QwG2lYHaKN+eOAQCzK8I2GsLfYRKjAbD58QBgHiq8h80V7jwdnxefH++n1ICvw7ulpMzeknyR5/yFwbI3s8XU/b3sVwDWnn77FY//A+NGuIANAOgZAAAAAElFTkSuQmCC';

/* ---------------------------------------------------------------
   Static option lists
--------------------------------------------------------------- */
const FEE_MODELS = [
  { key: 'aum', label: 'AUM (%)' },
  { key: 'planningFee', label: 'Planning fee ($)' },
  { key: 'subscription', label: 'Subscription ($)' },
  { key: 'hourly', label: 'Hourly ($)' },
];

const FREQUENCY_OPTIONS = ['Monthly', 'Quarterly', 'Semi-annual', 'Annual', 'As needed (reactive)', 'Other'];

const MEETING_TYPES = [
  { key: 'annualReview', label: 'Annual Review' },
  { key: 'quarterlyReview', label: 'Quarterly Review' },
  { key: 'taxPlanning', label: 'Tax Planning' },
  { key: 'springPlanning', label: 'Spring Planning Topic' },
];

const SERVICING_TEAM_OPTIONS = [
  { key: 'mostSeniorAdvisors', label: 'Most senior advisors' },
  { key: 'dedicatedService', label: 'Dedicated service' },
  { key: 'teamBased', label: 'Team-based approach' },
];

const ACCESS_OPTIONS = [
  { key: 'conciergeEmail', label: 'Access to concierge@firm email' },
  { key: 'basedOnPreference', label: 'Meeting format based on client preference' },
];

const INVESTMENT_OFFERINGS = [
  { key: 'traditional', label: 'Traditional investments' },
  { key: 'alternatives', label: 'Alternatives / private investments' },
];

const INVESTMENT_APPROACH = [
  { key: 'customInHouse', label: 'Custom investment selection, in-house' },
  { key: 'semiCustomInHouse', label: 'Semi-custom (custom and models), in-house' },
  { key: 'modelsInHouse', label: 'Models, in-house' },
  { key: 'modelsOutsourced', label: 'Models, outsourced' },
  { key: 'umh', label: 'Unified Managed Household (UMH)' },
  { key: 'sma', label: 'Separately Managed Account strategies (SMA)' },
  { key: 'taxOptimization', label: 'Tax optimization (tax-loss harvesting)' },
  { key: 'taxTransitioning', label: 'Tax transitioning' },
  { key: 'systematicRebalancing', label: 'Systematic rebalancing' },
  { key: 'dueDiligence', label: 'Investment due diligence' },
  { key: 'riskAssessment', label: 'Risk assessment' },
  { key: 'distributionFocused', label: 'Distribution-focused strategies' },
  { key: 'targetAllocation', label: 'Target allocation strategies' },
  { key: 'objectiveBased', label: 'Objective-based strategies' },
];

const PLANNING_BASIC = [
  { key: 'retirement', label: 'Retirement planning' },
  { key: 'cashFlow', label: 'Cash flow analysis' },
  { key: 'budgeting', label: 'Budgeting' },
  { key: 'goalSetting', label: 'Goal setting' },
];

const PLANNING_SPECIALIZED = [
  { key: 'taxPlanning', label: 'Tax planning' },
  { key: 'estatePlanning', label: 'Estate planning' },
  { key: 'charitableGiving', label: 'Charitable giving / planning' },
  { key: 'insurancePlanning', label: 'Insurance planning' },
  { key: 'healthcarePlanning', label: 'Healthcare planning' },
  { key: 'trustServices', label: 'Trust services' },
  { key: 'bankingServices', label: 'Banking services' },
  { key: 'businessOwnerServices', label: 'Business owner services' },
  { key: 'conciergeServices', label: 'Concierge services' },
  { key: 'consulting', label: 'Consulting' },
  { key: 'multiGenPlanning', label: 'Multi-generational planning' },
  { key: 'microMomentAutomation', label: 'Micro-moment automation' },
  { key: 'adviceEngagement', label: 'Advice engagement' },
  { key: 'aiPlanningAdvice', label: 'AI planning and advice' },
];

// Deliverables with a natural annual date/cadence — these appear on the calendar.
const DELIVERABLE_OPTIONS = [
  { key: 'annualUpdates', label: 'Annual plan updates' },
  { key: 'onePagePlan', label: 'One-page financial plan' },
  { key: 'trackingGoals', label: 'Tracking towards goals' },
  { key: 'taxesSavedReports', label: 'Taxes saved reports' },
  { key: 'serviceSchedule', label: 'Service schedule / calendar' },
  { key: 'spendingGuardrails', label: 'Spending guardrails report' },
];

// Deliverables with no natural date — shown in the overview / services list instead of the calendar.
const DELIVERABLE_FLAG_OPTIONS = [
  { key: 'initialPlan', label: 'Initial financial plan' },
];

const VALUEADD_OPTIONS = [
  { key: 'events', label: 'Events' },
  { key: 'gifts', label: 'Gifts' },
  { key: 'community', label: 'Community' },
  { key: 'education', label: 'Education' },
  { key: 'expertsAccess', label: 'Access to experts' },
  { key: 'multiGenSupport', label: 'Multi-generational support' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Controlled timing choices (dropdown) so every selection maps to an exact
// set of calendar months — no free-text guessing. Recurring choices resolve
// to multiple months; "As needed (reactive)" and "Monthly" resolve to all 12.
const TIMING_TO_MONTHS = {
  January: [1], February: [2], March: [3], April: [4], May: [5], June: [6],
  July: [7], August: [8], September: [9], October: [10], November: [11], December: [12],
  Q1: [2], Q2: [5], Q3: [8], Q4: [11],
  Monthly: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  Quarterly: [1, 4, 7, 10],
  'Semi-annual': [1, 7],
  'As needed (reactive)': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};
const TIMING_GROUPS = [
  { label: 'Specific month', options: MONTHS_FULL },
  { label: 'Quarter', options: ['Q1', 'Q2', 'Q3', 'Q4'] },
  { label: 'Recurring', options: ['Monthly', 'Quarterly', 'Semi-annual', 'As needed (reactive)'] },
];

const GROUP_COLOR = { Meeting: COLOR.oxblood, Virtual: COLOR.olive, Communications: COLOR.sage, Deliverable: COLOR.taupe, 'Value-add': COLOR.terracotta };

/* ---------------------------------------------------------------
   Factories / defaults
--------------------------------------------------------------- */
function makeToggleMap(options) {
  const map = {};
  options.forEach((o) => { map[o.key] = { selected: false, timing: '' }; });
  return map;
}
function makeFlagMap(options) {
  const map = {};
  options.forEach((o) => { map[o.key] = false; });
  return map;
}

function makeSegment() {
  return {
    name: '',
    persona: '',
    objective: '',
    feeModels: { ...makeFlagMap(FEE_MODELS), otherSelected: false, otherText: '' },
    feeAmounts: {},
    servicingTeam: { ...makeFlagMap(SERVICING_TEAM_OPTIONS), otherSelected: false, otherText: '' },
    teamComposition: '',
    directAccess: '',
    responseSLA: '',
    inPersonFrequency: '',
    meetingTypes: { ...makeToggleMap(MEETING_TYPES), otherSelected: false, otherText: '', otherTiming: '' },
    virtualFrequency: '',
    virtualMeetingTypes: { ...makeToggleMap(MEETING_TYPES), otherSelected: false, otherText: '', otherTiming: '' },
    emailComms: [{ name: '', timing: '' }],
    accessOptions: { ...makeFlagMap(ACCESS_OPTIONS), otherSelected: false, otherText: '', videoUpdates: { selected: false, timing: '' } },
    investment: { ...makeFlagMap(INVESTMENT_OFFERINGS), ...makeFlagMap(INVESTMENT_APPROACH), otherSelected: false, otherText: '' },
    planning: { ...makeFlagMap(PLANNING_BASIC), ...makeFlagMap(PLANNING_SPECIALIZED), otherSelected: false, otherText: '' },
    deliverables: { ...makeFlagMap(DELIVERABLE_FLAG_OPTIONS), ...makeToggleMap(DELIVERABLE_OPTIONS), otherSelected: false, otherText: '', otherTiming: '' },
    valueAdd: { ...makeToggleMap(VALUEADD_OPTIONS), otherSelected: false, otherText: '', otherTiming: '' },
  };
}

const INITIAL_INTRO = {
  firmName: '',
  hasSegments: '', // 'yes' | 'no'
  numSegments: null,
  serviceApproach: '',
};

function selectedLabels(options, stateObj, otherSelected, otherText) {
  const labels = options.filter((o) => stateObj[o.key]).map((o) => o.label);
  if (otherSelected && otherText && otherText.trim()) labels.push(otherText.trim());
  return labels;
}

/* Fee models are multi-select — these helpers turn the selection into a
   flat list of {key, label} pairs (including a custom "Other" entry),
   used for validation, the amount-per-model screen, and the overview row. */
function selectedFeeModels(seg) {
  const picked = FEE_MODELS.filter((f) => seg.feeModels[f.key]);
  if (seg.feeModels.otherSelected && seg.feeModels.otherText.trim()) {
    picked.push({ key: 'other', label: seg.feeModels.otherText.trim() });
  }
  return picked;
}
function hasAnyFeeModel(seg) { return selectedFeeModels(seg).length > 0; }
function allFeeAmountsFilled(seg) {
  const picked = selectedFeeModels(seg);
  if (!picked.length) return false;
  return picked.every((f) => (seg.feeAmounts[f.key] || '').trim());
}

/* ---------------------------------------------------------------
   Small reusable UI atoms (inline styles only)
--------------------------------------------------------------- */
function FieldLabel({ children, required, small }) {
  return (
    <label style={{ display: 'block', fontFamily: FONT_HEAD, fontSize: small ? 16 : 22, color: COLOR.nearBlack, marginBottom: small ? 6 : 10, lineHeight: 1.3 }}>
      {children}
      {required ? <span style={{ color: COLOR.oxblood }}> *</span> : null}
    </label>
  );
}

function HelpText({ children }) {
  if (!children) return null;
  return <p style={{ fontSize: 14, color: '#6B6459', marginTop: -4, marginBottom: 14 }}>{children}</p>;
}

function ErrorText({ children }) {
  if (!children) return null;
  return (
    <div style={{ background: COLOR.errorBg, color: COLOR.error, fontSize: 14, padding: '8px 12px', borderRadius: 6, marginTop: 8 }}>
      {children}
    </div>
  );
}

const inputBase = {
  width: '100%',
  fontSize: 16,
  padding: '12px 14px',
  border: `1.5px solid ${COLOR.border}`,
  borderRadius: 8,
  background: COLOR.white,
  color: COLOR.nearBlack,
  fontFamily: FONT_BODY,
};

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{ ...inputBase, resize: 'vertical', lineHeight: 1.5 }} />
  );
}
function TextInput(props) {
  return <input type="text" {...props} style={{ ...inputBase, ...(props.style || {}) }} />;
}

/* Controlled timing dropdown — every choice maps to exact calendar month(s)
   via TIMING_TO_MONTHS, so nothing needs to be parsed or guessed. */
function TimingSelect({ value, onChange }) {
  return (
    <select value={value} onChange={onChange} style={{ ...inputBase, fontSize: 14, padding: '9px 12px', cursor: 'pointer' }}>
      <option value="">Select timing…</option>
      {TIMING_GROUPS.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </optgroup>
      ))}
    </select>
  );
}

function PrimaryButton({ children, onClick, disabled, style }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? '#C9BBAE' : COLOR.oxblood, color: COLOR.paper, border: 'none', borderRadius: 8,
      padding: '13px 26px', fontSize: 16, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: FONT_BODY, ...style,
    }}>
      {children}
    </button>
  );
}
function SecondaryButton({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      background: 'transparent', color: COLOR.oxblood, border: `1.5px solid ${COLOR.oxblood}`, borderRadius: 8,
      padding: '11px 24px', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: FONT_BODY, ...style,
    }}>
      {children}
    </button>
  );
}

function CheckboxRow({ checked, onToggle, label, timing, onTimingChange }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', border: `1.5px solid ${checked ? COLOR.oxblood : COLOR.border}`, borderRadius: 8, background: checked ? COLOR.tanLight : COLOR.white }}>
        <input type="checkbox" checked={checked} onChange={onToggle} style={{ width: 18, height: 18, accentColor: COLOR.oxblood, flexShrink: 0 }} />
        <span style={{ fontSize: 16 }}>{label}</span>
      </label>
      {checked && onTimingChange ? (
        <div style={{ marginTop: 6, marginLeft: 8 }}>
          <TimingSelect value={timing} onChange={onTimingChange} />
        </div>
      ) : null}
    </div>
  );
}

function ProgressBar({ fraction }) {
  return (
    <div style={{ width: '100%', height: 6, background: COLOR.tanLight, borderRadius: 3, overflow: 'hidden', marginBottom: 22 }}>
      <div style={{ width: `${Math.round(fraction * 100)}%`, height: '100%', background: COLOR.oxblood, transition: 'width 0.25s ease' }} />
    </div>
  );
}

/* Intro banner shown on the first screen only */
function IntroBanner() {
  return (
    <div style={{ marginBottom: 28 }}>
      <span style={{ display: 'inline-block', background: COLOR.sage, color: COLOR.paper, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, marginBottom: 14 }}>
        Completely free
      </span>
      <h1 style={{ fontFamily: FONT_HEAD, fontSize: 'clamp(30px, 6vw, 40px)', color: COLOR.oxblood, lineHeight: 1.1, margin: '0 0 12px' }}>
        Service Model Builder
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.5, color: COLOR.nearBlack, margin: '0 0 20px' }}>
        Answer a few questions about how you serve your clients. At the end, you'll get two print-ready pages built from your answers.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 18 }}>
        <IntroDeliverable title="One-Page Client Service Overview" text="What clients get when they work with you, on a single page." />
        <IntroDeliverable title="Client Service Calendar" text="Your year of client touchpoints, laid out month by month." />
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: '#6B6459', margin: 0 }}>
        Use them with clients and prospects, send them to a designer, or put them on your website.
      </p>
      <div style={{ height: 1, background: COLOR.border, marginTop: 24 }} />
    </div>
  );
}

function IntroDeliverable({ title, text }) {
  return (
    <div style={{ borderTop: `3px solid ${COLOR.tan}`, paddingTop: 10 }}>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 18, color: COLOR.oxblood, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 15, lineHeight: 1.45, color: COLOR.nearBlack }}>{text}</div>
    </div>
  );
}

function QuestionShell({ header, eyebrow, progressFraction, children, onBack, onNext, nextLabel = 'Next', showBack = true, nextDisabled }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: COLOR.paper }}>
      <div style={pageWrap}>
        <div style={cardWrap}>
          <div style={datumRule} />
          <div style={{ paddingLeft: 26 }}>
            {header}
            {eyebrow ? (
              <div style={{ fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: COLOR.oxblood, fontWeight: 700, marginBottom: 10 }}>{eyebrow}</div>
            ) : null}
            <ProgressBar fraction={progressFraction} />
            {children}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, gap: 12 }}>
              {showBack ? <SecondaryButton onClick={onBack}>Back</SecondaryButton> : <span />}
              <PrimaryButton onClick={onNext} disabled={nextDisabled}>{nextLabel}</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

const pageWrap = { flex: 1, background: COLOR.paper, display: 'flex', justifyContent: 'center', padding: '32px 16px 60px', fontFamily: FONT_BODY };
const cardWrap = { width: '100%', maxWidth: 640, position: 'relative' };
const datumRule = { position: 'absolute', left: 0, top: 4, bottom: 4, width: 4, background: COLOR.oxblood, borderRadius: 2 };

/* ---------------------------------------------------------------
   Step map — built once per (hasSegments, numSegments) combo so
   Back/Next always walk the SAME array, keeping currentQ tracking
   correct across segment boundaries.
--------------------------------------------------------------- */
function buildSteps(hasSegments, numSegmentsInput) {
  const steps = [{ id: 'firmName' }, { id: 'hasSegments' }];
  if (hasSegments === 'yes') steps.push({ id: 'segCount' }, { id: 'segApproach' });

  const numSegments = hasSegments === 'no' ? 1 : (numSegmentsInput || 0);

  const perSegmentIds = [
    ...(hasSegments === 'yes' ? ['name'] : []),
    'persona', 'objective', 'feeModel', 'feeAmount',
    'servicingTeam', 'teamAccess', 'responseSLA',
    'inPersonMeetings', 'meetingTypes',
    'virtualMeetings', 'virtualMeetingTypes',
    'emailComms', 'accessOptions',
    'investment', 'planning',
    'deliverables', 'valueAdd',
  ];

  for (let s = 0; s < numSegments; s++) {
    perSegmentIds.forEach((fieldId, i) => {
      steps.push({ id: `seg-${fieldId}`, seg: s, qIndex: i + 1, qTotal: perSegmentIds.length });
    });
  }
  if (numSegments > 0) steps.push({ id: 'preview' });
  return steps;
}

/* ---------------------------------------------------------------
   Main App
--------------------------------------------------------------- */
export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [intro, setIntro] = useState(INITIAL_INTRO);
  const [segments, setSegments] = useState([]);
  const [error, setError] = useState('');

  const steps = useMemo(() => buildSteps(intro.hasSegments, intro.numSegments), [intro.hasSegments, intro.numSegments]);
  const safeStepIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[safeStepIndex];

  useEffect(() => {
    const target = intro.hasSegments === 'no' ? 1 : (intro.numSegments || 0);
    setSegments((prev) => {
      if (target === prev.length) return prev;
      const next = prev.slice(0, target);
      while (next.length < target) next.push(makeSegment());
      return next;
    });
  }, [intro.hasSegments, intro.numSegments]);

  function goTo(nextIndex) { setError(''); setStepIndex(Math.max(0, Math.min(nextIndex, steps.length - 1))); }
  function goNext() {
    const err = validateStep(step, intro, segments);
    if (err) { setError(err); return; }
    goTo(safeStepIndex + 1);
  }
  function goBack() { goTo(safeStepIndex - 1); }

  function updateIntro(patch) { setError(''); setIntro((prev) => ({ ...prev, ...patch })); }
  function updateSegment(segIdx, patch) { setError(''); setSegments((prev) => prev.map((seg, i) => (i === segIdx ? { ...seg, ...patch } : seg))); }
  function updateSegmentField(segIdx, field, subPatch) { setError(''); setSegments((prev) => prev.map((seg, i) => (i === segIdx ? { ...seg, [field]: { ...seg[field], ...subPatch } } : seg))); }

  function startOver() {
    if (window.confirm("Start over? This clears everything you've entered.")) {
      setIntro(INITIAL_INTRO); setSegments([]); setStepIndex(0); setError('');
    }
  }

  if (!step) return null;

  if (step.id === 'preview') {
    return <Preview intro={intro} segments={segments} onBack={goBack} onStartOver={startOver} />;
  }

  if (step.id === 'firmName') {
    return (
      <QuestionShell header={<IntroBanner />} eyebrow="Getting started" progressFraction={(safeStepIndex + 1) / steps.length} showBack={false} onNext={goNext}>
        <FieldLabel required>What's your firm name?</FieldLabel>
        <HelpText>This appears as the title of your one-pager.</HelpText>
        <TextInput value={intro.firmName} onChange={(e) => updateIntro({ firmName: e.target.value })} placeholder="e.g., Align Advisor Consulting" />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  if (step.id === 'hasSegments') {
    return (
      <QuestionShell eyebrow="Getting started" progressFraction={(safeStepIndex + 1) / steps.length} onBack={goBack} onNext={goNext}>
        <FieldLabel required>Do you currently serve different client groups with different service models?</FieldLabel>
        <RadioCard
          options={[{ value: 'yes', label: 'Yes, I already segment clients' }, { value: 'no', label: 'No, I have one service model for all clients' }]}
          value={intro.hasSegments}
          onChange={(v) => updateIntro({ hasSegments: v, numSegments: v === 'no' ? null : intro.numSegments })}
        />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  if (step.id === 'segCount') {
    return (
      <QuestionShell eyebrow="Getting started" progressFraction={(safeStepIndex + 1) / steps.length} onBack={goBack} onNext={goNext}>
        <FieldLabel required>How many client segments do you have?</FieldLabel>
        <HelpText>Choose between 2 and 5.</HelpText>
        <RadioCard options={[2, 3, 4, 5].map((n) => ({ value: n, label: String(n) }))} value={intro.numSegments} onChange={(v) => updateIntro({ numSegments: v })} inline />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  if (step.id === 'segApproach') {
    return (
      <QuestionShell eyebrow="Getting started" progressFraction={(safeStepIndex + 1) / steps.length} onBack={goBack} onNext={goNext}>
        <FieldLabel required>What's your service offering approach across segments?</FieldLabel>
        <RadioCard
          options={[{ value: 'different', label: 'Different services per segment' }, { value: 'depth', label: 'Same core services, different depth' }, { value: 'mix', label: 'Mix of both' }]}
          value={intro.serviceApproach}
          onChange={(v) => updateIntro({ serviceApproach: v })}
        />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  if (step.id.startsWith('seg-')) {
    const seg = segments[step.seg] || makeSegment();
    const segLabel = intro.hasSegments === 'no' ? 'your service model' : (seg.name || `Segment ${step.seg + 1}`);
    const eyebrow = intro.hasSegments === 'no'
      ? `Question ${step.qIndex} of ${step.qTotal}`
      : `Segment ${step.seg + 1} of ${segments.length} — Question ${step.qIndex} of ${step.qTotal}`;

    const common = { seg, segIdx: step.seg, segLabel, updateSegment, updateSegmentField };
    return (
      <QuestionShell
        eyebrow={eyebrow}
        progressFraction={(safeStepIndex + 1) / steps.length}
        onBack={goBack}
        onNext={goNext}
        nextLabel={safeStepIndex === steps.length - 2 ? (segments.length > 1 && step.seg < segments.length - 1 ? 'Next segment' : 'Preview') : 'Next'}
      >
        <SegmentField fieldId={step.id.replace('seg-', '')} {...common} />
        <ErrorText>{error}</ErrorText>
      </QuestionShell>
    );
  }

  return null;
}

function RadioCard({ options, value, onChange, inline }) {
  return (
    <div style={{ display: 'flex', flexDirection: inline ? 'row' : 'column', flexWrap: 'wrap', gap: 10 }}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button key={String(opt.value)} onClick={() => onChange(opt.value)} style={{
            textAlign: 'left', padding: '13px 16px', borderRadius: 8, border: `1.5px solid ${selected ? COLOR.oxblood : COLOR.border}`,
            background: selected ? COLOR.tanLight : COLOR.white, color: COLOR.nearBlack, fontSize: 16, cursor: 'pointer', fontFamily: FONT_BODY,
            minWidth: inline ? 56 : undefined, flex: inline ? '0 0 auto' : undefined,
          }}>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------
   Validation
--------------------------------------------------------------- */
function validateStep(step, intro, segments) {
  if (step.id === 'firmName' && !intro.firmName.trim()) return 'Please enter your firm name.';
  if (step.id === 'hasSegments' && !intro.hasSegments) return 'Please choose an option to continue.';
  if (step.id === 'segCount' && !intro.numSegments) return 'Please choose how many segments you have.';
  if (step.id === 'segApproach' && !intro.serviceApproach) return 'Please choose an option to continue.';

  if (step.id.startsWith('seg-')) {
    const seg = segments[step.seg];
    if (!seg) return '';
    const field = step.id.replace('seg-', '');
    if (field === 'name' && !seg.name.trim()) return 'Please enter a name for this segment.';
    if (field === 'persona' && !seg.persona.trim()) return "Please describe this segment's persona.";
    if (field === 'objective' && !seg.objective.trim()) return 'Please enter a primary objective.';
    if (field === 'feeModel' && !hasAnyFeeModel(seg)) return 'Please select at least one fee model.';
    if (field === 'feeAmount' && !allFeeAmountsFilled(seg)) return 'Please enter an amount or rate for each selected fee model.';
  }
  return '';
}

/* ---------------------------------------------------------------
   Per-segment question renderer
--------------------------------------------------------------- */
function SegmentField({ fieldId, seg, segIdx, segLabel, updateSegment, updateSegmentField }) {
  switch (fieldId) {
    case 'name':
      return (
        <>
          <FieldLabel required>Segment name</FieldLabel>
          <HelpText>e.g., Platinum, Gold, Silver or A, AA, AAA</HelpText>
          <TextArea rows={1} value={seg.name} onChange={(e) => updateSegment(segIdx, { name: e.target.value })} placeholder="e.g., Platinum" />
        </>
      );

    case 'persona':
      return (
        <>
          <FieldLabel required>Describe the {segLabel} persona</FieldLabel>
          <TextArea value={seg.persona} onChange={(e) => updateSegment(segIdx, { persona: e.target.value })} placeholder="e.g., High-net-worth executives, age 50–65" />
        </>
      );

    case 'objective':
      return (
        <>
          <FieldLabel required>Primary objective for {segLabel}</FieldLabel>
          <TextArea value={seg.objective} onChange={(e) => updateSegment(segIdx, { objective: e.target.value })} placeholder="e.g., Preserve wealth and coordinate a tax-efficient retirement transition" />
        </>
      );

    case 'feeModel':
      return (
        <>
          <FieldLabel required>Fee model(s) for {segLabel}</FieldLabel>
          <HelpText>Check all that apply — segments can combine more than one fee model.</HelpText>
          {FEE_MODELS.map((f) => (
            <CheckboxRow key={f.key} label={f.label} checked={seg.feeModels[f.key]}
              onToggle={() => updateSegmentField(segIdx, 'feeModels', { [f.key]: !seg.feeModels[f.key] })} />
          ))}
          <OtherField selected={seg.feeModels.otherSelected} text={seg.feeModels.otherText}
            onToggle={() => updateSegmentField(segIdx, 'feeModels', { otherSelected: !seg.feeModels.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'feeModels', { otherText: e.target.value })} />
        </>
      );

    case 'feeAmount': {
      const picked = selectedFeeModels(seg);
      return (
        <>
          <FieldLabel required>Fee amount or rate for {segLabel}</FieldLabel>
          {picked.length === 0 ? (
            <HelpText>Go back and select at least one fee model first.</HelpText>
          ) : (
            picked.map((f) => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <FieldLabel small>{f.label}</FieldLabel>
                <TextInput
                  value={seg.feeAmounts[f.key] || ''}
                  onChange={(e) => updateSegment(segIdx, { feeAmounts: { ...seg.feeAmounts, [f.key]: e.target.value } })}
                  placeholder="e.g., 1.00% or $2,500/year"
                />
              </div>
            ))
          )}
        </>
      );
    }

    case 'servicingTeam':
      return (
        <>
          <FieldLabel>How is {segLabel} serviced?</FieldLabel>
          <HelpText>Check what applies.</HelpText>
          {SERVICING_TEAM_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.servicingTeam[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'servicingTeam', { [opt.key]: !seg.servicingTeam[opt.key] })} />
          ))}
          <OtherField selected={seg.servicingTeam.otherSelected} text={seg.servicingTeam.otherText}
            onToggle={() => updateSegmentField(segIdx, 'servicingTeam', { otherSelected: !seg.servicingTeam.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'servicingTeam', { otherText: e.target.value })} />
        </>
      );

    case 'teamAccess':
      return (
        <>
          <FieldLabel>Team structure & direct access for {segLabel}</FieldLabel>
          <div style={{ marginBottom: 18 }}>
            <FieldLabel small>Who's on the service team?</FieldLabel>
            <TextInput value={seg.teamComposition} onChange={(e) => updateSegment(segIdx, { teamComposition: e.target.value })} placeholder="e.g., Lead Advisor + Senior CSA" />
          </div>
          <div>
            <FieldLabel small>How can this segment reach their advisor directly?</FieldLabel>
            <TextInput value={seg.directAccess} onChange={(e) => updateSegment(segIdx, { directAccess: e.target.value })} placeholder="e.g., Direct phone, cell phone, email" />
          </div>
        </>
      );

    case 'responseSLA':
      return (
        <>
          <FieldLabel>What's the response-time SLA for {segLabel}?</FieldLabel>
          <TextInput value={seg.responseSLA} onChange={(e) => updateSegment(segIdx, { responseSLA: e.target.value })} placeholder="e.g., Within 2 hours, Same day, Within 24 hours" />
        </>
      );

    case 'inPersonMeetings':
      return (
        <>
          <FieldLabel>How often does {segLabel} meet in person?</FieldLabel>
          <RadioCard options={FREQUENCY_OPTIONS.map((f) => ({ value: f, label: f }))} value={seg.inPersonFrequency} onChange={(v) => updateSegment(segIdx, { inPersonFrequency: v })} />
        </>
      );

    case 'meetingTypes':
      return (
        <>
          <FieldLabel>Which in-person meeting types, and when?</FieldLabel>
          <HelpText>Check what applies and choose the timing.</HelpText>
          {MEETING_TYPES.map((mt) => (
            <CheckboxRow key={mt.key} label={mt.label} checked={seg.meetingTypes[mt.key].selected}
              onToggle={() => updateSegmentField(segIdx, 'meetingTypes', { [mt.key]: { ...seg.meetingTypes[mt.key], selected: !seg.meetingTypes[mt.key].selected } })}
              timing={seg.meetingTypes[mt.key].timing}
              onTimingChange={(e) => updateSegmentField(segIdx, 'meetingTypes', { [mt.key]: { ...seg.meetingTypes[mt.key], timing: e.target.value } })} />
          ))}
          <OtherField selected={seg.meetingTypes.otherSelected} text={seg.meetingTypes.otherText} timing={seg.meetingTypes.otherTiming} withTiming
            onToggle={() => updateSegmentField(segIdx, 'meetingTypes', { otherSelected: !seg.meetingTypes.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'meetingTypes', { otherText: e.target.value })}
            onTimingChange={(e) => updateSegmentField(segIdx, 'meetingTypes', { otherTiming: e.target.value })} />
        </>
      );

    case 'virtualMeetings':
      return (
        <>
          <FieldLabel>How often does {segLabel} meet virtually / by phone?</FieldLabel>
          <RadioCard options={FREQUENCY_OPTIONS.map((f) => ({ value: f, label: f }))} value={seg.virtualFrequency} onChange={(v) => updateSegment(segIdx, { virtualFrequency: v })} />
        </>
      );

    case 'virtualMeetingTypes':
      return (
        <>
          <FieldLabel>Which virtual meeting types, and when?</FieldLabel>
          <HelpText>Check what applies and choose the timing.</HelpText>
          {MEETING_TYPES.map((mt) => (
            <CheckboxRow key={mt.key} label={mt.label} checked={seg.virtualMeetingTypes[mt.key].selected}
              onToggle={() => updateSegmentField(segIdx, 'virtualMeetingTypes', { [mt.key]: { ...seg.virtualMeetingTypes[mt.key], selected: !seg.virtualMeetingTypes[mt.key].selected } })}
              timing={seg.virtualMeetingTypes[mt.key].timing}
              onTimingChange={(e) => updateSegmentField(segIdx, 'virtualMeetingTypes', { [mt.key]: { ...seg.virtualMeetingTypes[mt.key], timing: e.target.value } })} />
          ))}
          <OtherField selected={seg.virtualMeetingTypes.otherSelected} text={seg.virtualMeetingTypes.otherText} timing={seg.virtualMeetingTypes.otherTiming} withTiming
            onToggle={() => updateSegmentField(segIdx, 'virtualMeetingTypes', { otherSelected: !seg.virtualMeetingTypes.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'virtualMeetingTypes', { otherText: e.target.value })}
            onTimingChange={(e) => updateSegmentField(segIdx, 'virtualMeetingTypes', { otherTiming: e.target.value })} />
        </>
      );

    case 'emailComms':
      return <EmailCommsField seg={seg} segIdx={segIdx} updateSegment={updateSegment} />;

    case 'accessOptions':
      return (
        <>
          <FieldLabel>Additional access & communication options for {segLabel}</FieldLabel>
          {ACCESS_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.accessOptions[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'accessOptions', { [opt.key]: !seg.accessOptions[opt.key] })} />
          ))}
          <CheckboxRow label="Video-based messages / updates" checked={seg.accessOptions.videoUpdates.selected}
            onToggle={() => updateSegmentField(segIdx, 'accessOptions', { videoUpdates: { ...seg.accessOptions.videoUpdates, selected: !seg.accessOptions.videoUpdates.selected } })}
            timing={seg.accessOptions.videoUpdates.timing}
            onTimingChange={(e) => updateSegmentField(segIdx, 'accessOptions', { videoUpdates: { ...seg.accessOptions.videoUpdates, timing: e.target.value } })} />
          <OtherField selected={seg.accessOptions.otherSelected} text={seg.accessOptions.otherText}
            onToggle={() => updateSegmentField(segIdx, 'accessOptions', { otherSelected: !seg.accessOptions.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'accessOptions', { otherText: e.target.value })} />
        </>
      );

    case 'investment':
      return (
        <>
          <FieldLabel>Investment management for {segLabel}</FieldLabel>
          <SubHeading>Investment offerings</SubHeading>
          {INVESTMENT_OFFERINGS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.investment[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'investment', { [opt.key]: !seg.investment[opt.key] })} />
          ))}
          <SubHeading>Investment management approach</SubHeading>
          {INVESTMENT_APPROACH.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.investment[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'investment', { [opt.key]: !seg.investment[opt.key] })} />
          ))}
          <OtherField selected={seg.investment.otherSelected} text={seg.investment.otherText}
            onToggle={() => updateSegmentField(segIdx, 'investment', { otherSelected: !seg.investment.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'investment', { otherText: e.target.value })} />
        </>
      );

    case 'planning':
      return (
        <>
          <FieldLabel>Financial planning for {segLabel}</FieldLabel>
          <SubHeading>Basic</SubHeading>
          {PLANNING_BASIC.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.planning[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'planning', { [opt.key]: !seg.planning[opt.key] })} />
          ))}
          <SubHeading>Specialized</SubHeading>
          {PLANNING_SPECIALIZED.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.planning[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'planning', { [opt.key]: !seg.planning[opt.key] })} />
          ))}
          <OtherField selected={seg.planning.otherSelected} text={seg.planning.otherText}
            onToggle={() => updateSegmentField(segIdx, 'planning', { otherSelected: !seg.planning.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'planning', { otherText: e.target.value })} />
        </>
      );

    case 'deliverables':
      return (
        <>
          <FieldLabel>Deliverables and reports for {segLabel}</FieldLabel>
          {DELIVERABLE_FLAG_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.deliverables[opt.key]}
              onToggle={() => updateSegmentField(segIdx, 'deliverables', { [opt.key]: !seg.deliverables[opt.key] })} />
          ))}
          <HelpText>{DELIVERABLE_FLAG_OPTIONS.length ? "\"Initial financial plan\" has no annual date, so it'll show in the overview instead of the calendar." : null}</HelpText>
          <HelpText>Check what applies below and choose the timing.</HelpText>
          {DELIVERABLE_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.deliverables[opt.key].selected}
              onToggle={() => updateSegmentField(segIdx, 'deliverables', { [opt.key]: { ...seg.deliverables[opt.key], selected: !seg.deliverables[opt.key].selected } })}
              timing={seg.deliverables[opt.key].timing}
              onTimingChange={(e) => updateSegmentField(segIdx, 'deliverables', { [opt.key]: { ...seg.deliverables[opt.key], timing: e.target.value } })} />
          ))}
          <OtherField selected={seg.deliverables.otherSelected} text={seg.deliverables.otherText} timing={seg.deliverables.otherTiming} withTiming
            onToggle={() => updateSegmentField(segIdx, 'deliverables', { otherSelected: !seg.deliverables.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'deliverables', { otherText: e.target.value })}
            onTimingChange={(e) => updateSegmentField(segIdx, 'deliverables', { otherTiming: e.target.value })} />
        </>
      );

    case 'valueAdd':
      return (
        <>
          <FieldLabel>Value-add experiences for {segLabel}</FieldLabel>
          <HelpText>Check what applies and choose the timing.</HelpText>
          {VALUEADD_OPTIONS.map((opt) => (
            <CheckboxRow key={opt.key} label={opt.label} checked={seg.valueAdd[opt.key].selected}
              onToggle={() => updateSegmentField(segIdx, 'valueAdd', { [opt.key]: { ...seg.valueAdd[opt.key], selected: !seg.valueAdd[opt.key].selected } })}
              timing={seg.valueAdd[opt.key].timing}
              onTimingChange={(e) => updateSegmentField(segIdx, 'valueAdd', { [opt.key]: { ...seg.valueAdd[opt.key], timing: e.target.value } })} />
          ))}
          <OtherField selected={seg.valueAdd.otherSelected} text={seg.valueAdd.otherText} timing={seg.valueAdd.otherTiming} withTiming
            onToggle={() => updateSegmentField(segIdx, 'valueAdd', { otherSelected: !seg.valueAdd.otherSelected })}
            onTextChange={(e) => updateSegmentField(segIdx, 'valueAdd', { otherText: e.target.value })}
            onTimingChange={(e) => updateSegmentField(segIdx, 'valueAdd', { otherTiming: e.target.value })} />
        </>
      );

    default:
      return null;
  }
}

function SubHeading({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 700, color: COLOR.oxblood, textTransform: 'uppercase', letterSpacing: '0.04em', margin: '18px 0 8px' }}>{children}</div>;
}

function OtherField({ selected, text, onToggle, onTextChange, withTiming, timing, onTimingChange }) {
  return (
    <div style={{ marginBottom: 10, marginTop: 4 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 12px', border: `1.5px solid ${selected ? COLOR.oxblood : COLOR.border}`, borderRadius: 8, background: selected ? COLOR.tanLight : COLOR.white }}>
        <input type="checkbox" checked={selected} onChange={onToggle} style={{ width: 18, height: 18, accentColor: COLOR.oxblood, flexShrink: 0 }} />
        <span style={{ fontSize: 16 }}>Other</span>
      </label>
      {selected ? (
        <div style={{ marginTop: 6, marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <TextInput value={text} onChange={onTextChange} placeholder="Describe it" style={{ fontSize: 14, padding: '9px 12px' }} />
          {withTiming ? <TimingSelect value={timing} onChange={onTimingChange} /> : null}
        </div>
      ) : null}
    </div>
  );
}

function EmailCommsField({ seg, segIdx, updateSegment }) {
  const rows = seg.emailComms;
  function updateRow(i, patch) { updateSegment(segIdx, { emailComms: rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)) }); }
  function addRow() { updateSegment(segIdx, { emailComms: [...rows, { name: '', timing: '' }] }); }
  function removeRow(i) { const next = rows.filter((_, idx) => idx !== i); updateSegment(segIdx, { emailComms: next.length ? next : [{ name: '', timing: '' }] }); }

  return (
    <>
      <FieldLabel>Email communications</FieldLabel>
      <HelpText>e.g., "Monthly Newsletter" set to Monthly, or "Quarterly Market Update" set to Q1</HelpText>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <TextInput value={row.name} onChange={(e) => updateRow(i, { name: e.target.value })} placeholder="Communication type, e.g., Monthly Newsletter" style={{ flex: '1 1 220px' }} />
          <div style={{ flex: '1 1 160px' }}><TimingSelect value={row.timing} onChange={(e) => updateRow(i, { timing: e.target.value })} /></div>
          {rows.length > 1 ? (
            <button onClick={() => removeRow(i)} aria-label="Remove this row" style={{ background: 'transparent', border: `1.5px solid ${COLOR.border}`, borderRadius: 8, color: COLOR.oxblood, padding: '11px 12px', cursor: 'pointer', fontSize: 14 }}>Remove</button>
          ) : null}
        </div>
      ))}
      <button onClick={addRow} style={{ background: 'transparent', border: `1.5px dashed ${COLOR.oxblood}`, color: COLOR.oxblood, borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontSize: 15, marginTop: 4, fontFamily: FONT_BODY }}>
        + Add another communication type
      </button>
    </>
  );
}

/* ---------------------------------------------------------------
   PREVIEW / OUTPUT
--------------------------------------------------------------- */
function Preview({ intro, segments, onBack, onStartOver }) {
  const title = `${intro.firmName || 'Your Firm'} Client Service Overview and Calendar`;

  return (
    <div style={{ minHeight: '100vh', background: COLOR.paper, fontFamily: FONT_BODY, display: 'flex', flexDirection: 'column' }}>
      <style>{PRINT_STYLES}</style>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '32px 16px 40px' }}>
        <div style={{ width: '100%', maxWidth: 900 }}>
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
            <SecondaryButton onClick={onBack}>Back</SecondaryButton>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <SecondaryButton onClick={() => window.print()}>Print / Save as PDF</SecondaryButton>
              <PrimaryButton onClick={onStartOver}>Start over</PrimaryButton>
            </div>
          </div>

          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 34, color: COLOR.oxblood, marginBottom: 6, lineHeight: 1.2 }}>{title}</h1>
          <div style={{ width: 64, height: 4, background: COLOR.tan, borderRadius: 2, marginBottom: 36 }} />

          <SectionHeading>Service Segments Overview</SectionHeading>
          <ServiceMatrix intro={intro} segments={segments} />

          <div className="print-page-break">
            <SectionHeading>Per-Segment Annual Service Calendars</SectionHeading>
            {segments.map((seg, i) => (
              <SegmentCalendar key={i} seg={seg} label={intro.hasSegments === 'no' ? 'Client Service' : (seg.name || `Segment ${i + 1}`)} />
            ))}
          </div>

          <SectionHeading>Next Steps</SectionHeading>
          <div style={{ background: COLOR.tanLight, borderRadius: 10, padding: '20px 22px', marginBottom: 20, fontSize: 16, lineHeight: 1.6 }}>
            To refine segmentation strategy and align your value to your worth, schedule your{' '}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>15-minute learn more call</a>.
          </div>

          <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <PrimaryButton onClick={onStartOver}>Start over</PrimaryButton>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

/* Print handling, self-contained so no separate CSS file edits are needed:
   - .no-print elements (Back / Start over / Print buttons) are hidden when printing.
   - Background colors/images print by default, without the user needing to
     manually enable "Background graphics" in the print dialog.
   - .print-page-break forces the calendar section to start on a fresh page,
     so the printed/PDF output is a clean 2-pager: overview, then calendars.
   - .print-avoid-break keeps the overview table and each segment's calendar
     from being awkwardly split across a page boundary. */
const PRINT_STYLES = `
  @media print {
    .no-print { display: none !important; }
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    .print-page-break {
      break-before: page;
      page-break-before: always;
    }
    .print-avoid-break {
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
`;

/* Site footer — shown at the bottom of every screen.
   Logo + website + email + complimentary consultation button.
   The button is hidden when printing; logo, website, and email still print.
   On narrow screens the pieces stack and the button goes full width. */
const FOOTER_STYLES = `
  .site-footer a:hover { opacity: 0.85; }
  @media (max-width: 640px) {
    .site-footer-inner { flex-direction: column; align-items: flex-start !important; }
    .site-footer-cta { width: 100%; box-sizing: border-box; }
  }
`;

function FooterIcon({ type }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: COLOR.tan, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, style: { flexShrink: 0 } };
  if (type === 'mail') {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

function SiteFooter() {
  const linkStyle = { color: COLOR.paper, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 };
  return (
    <footer className="site-footer" style={{ background: COLOR.oxblood, width: '100%', padding: '24px 16px', fontFamily: FONT_BODY, boxSizing: 'border-box' }}>
      <style>{FOOTER_STYLES}</style>
      <div className="site-footer-inner" style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
        <a href={SITE_URL} target="_blank" rel="noopener noreferrer" aria-label="Align Advisor Consulting website">
          <img src={LOGO_SRC} alt="Align Advisor Consulting" style={{ height: 48, width: 'auto', display: 'block' }} />
        </a>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <FooterIcon type="web" />
            alignadvisorconsulting.com
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}>
            <FooterIcon type="mail" />
            {CONTACT_EMAIL}
          </a>
        </div>
        <a
          className="site-footer-cta no-print"
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: COLOR.tan, color: COLOR.oxblood, padding: '11px 18px', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          Book a complimentary consultation <span aria-hidden="true">→</span>
        </a>
      </div>
    </footer>
  );
}

function SectionHeading({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, marginTop: 6 }}>
      <div style={{ width: 4, height: 22, background: COLOR.oxblood, borderRadius: 2 }} />
      <h2 style={{ fontFamily: FONT_HEAD, fontSize: 22, color: COLOR.nearBlack, margin: 0 }}>{children}</h2>
    </div>
  );
}

function truncate(text, n) {
  const t = (text || '').trim();
  if (t.length <= n) return t;
  return t.slice(0, n).trim() + '…';
}

function ServiceChips({ labels }) {
  if (!labels.length) return <span style={{ color: '#B3AB9C', fontSize: 13 }}>—</span>;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
      {labels.map((label, i) => (
        <span key={i} style={{ fontSize: 11, padding: '4px 9px', borderRadius: 20, background: COLOR.tanLight, border: `1px solid ${COLOR.border}`, color: COLOR.nearBlack, whiteSpace: 'nowrap' }}>{label}</span>
      ))}
    </div>
  );
}

function FeeModelSummary({ seg }) {
  const picked = selectedFeeModels(seg);
  if (!picked.length) return <span style={{ color: '#B3AB9C', fontSize: 13 }}>—</span>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {picked.map((f) => (
        <div key={f.key}>{f.label}{seg.feeAmounts[f.key] ? ` – ${seg.feeAmounts[f.key]}` : ''}</div>
      ))}
    </div>
  );
}

/* Segment-comparison matrix: segments as columns, service attributes
   as rows — mirrors a standard advisor "client service matrix." */
function ServiceMatrix({ intro, segments }) {
  const PLANNING_ALL = [...PLANNING_BASIC, ...PLANNING_SPECIALIZED];

  const rows = [
    { label: 'Persona', render: (s) => truncate(s.persona, 50) || '—' },
    { label: 'Fee model', render: (s) => <FeeModelSummary seg={s} /> },
    { label: 'In-person meetings', render: (s) => s.inPersonFrequency || '—' },
    { label: 'Virtual / phone meetings', render: (s) => s.virtualFrequency || '—' },
    { label: 'Servicing team', render: (s) => <ServiceChips labels={selectedLabels(SERVICING_TEAM_OPTIONS, s.servicingTeam, s.servicingTeam.otherSelected, s.servicingTeam.otherText)} /> },
    { label: 'Team structure & contact', render: (s) => s.teamComposition || '—' },
    { label: 'Direct advisor access', render: (s) => s.directAccess || '—' },
    { label: 'Response-time SLA', render: (s) => s.responseSLA || '—' },
    { label: 'Investment management', render: (s) => <ServiceChips labels={selectedLabels([...INVESTMENT_OFFERINGS, ...INVESTMENT_APPROACH], s.investment, s.investment.otherSelected, s.investment.otherText)} /> },
    { label: 'Initial financial plan', render: (s) => (s.deliverables.initialPlan ? '\u2713 Included' : '—') },
    { label: 'Services included', render: (s) => <ServiceChips labels={[...selectedLabels(PLANNING_ALL, s.planning, s.planning.otherSelected, s.planning.otherText), ...selectedLabels(ACCESS_OPTIONS, s.accessOptions, s.accessOptions.otherSelected, s.accessOptions.otherText)]} /> },
  ];

  return (
    <div className="print-avoid-break" style={{ overflowX: 'auto', marginBottom: 44 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px 14px', borderBottom: `2px solid ${COLOR.oxblood}` }} />
            {segments.map((seg, i) => (
              <th key={i} style={{ textAlign: 'left', fontFamily: FONT_HEAD, fontSize: 16, color: COLOR.white, background: COLOR.oxblood, padding: '10px 14px' }}>
                {intro.hasSegments === 'no' ? 'All clients' : (seg.name || `Segment ${i + 1}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.label} style={{ background: ri % 2 ? COLOR.tanLight : 'transparent' }}>
              <td style={{ padding: '10px 14px', borderBottom: `1px dotted ${COLOR.border}`, fontWeight: 700, whiteSpace: 'nowrap', verticalAlign: 'top' }}>{row.label}</td>
              {segments.map((seg, i) => (
                <td key={i} style={{ padding: '10px 14px', borderBottom: `1px dotted ${COLOR.border}`, fontSize: 14, verticalAlign: 'top' }}>{row.render(seg)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Flat list of {label, timing, group} items from the timed fields
   (in-person meetings, virtual meetings, email comms, deliverables,
   value-add). "Initial financial plan" is intentionally excluded —
   it has no annual date and appears in the overview instead. */
function collectCalendarItems(seg) {
  const items = [];

  MEETING_TYPES.forEach((mt) => { const v = seg.meetingTypes[mt.key]; if (v.selected) items.push({ label: mt.label, timing: v.timing, group: 'Meeting' }); });
  if (seg.meetingTypes.otherSelected && seg.meetingTypes.otherText.trim()) items.push({ label: seg.meetingTypes.otherText, timing: seg.meetingTypes.otherTiming, group: 'Meeting' });

  MEETING_TYPES.forEach((mt) => { const v = seg.virtualMeetingTypes[mt.key]; if (v.selected) items.push({ label: mt.label, timing: v.timing, group: 'Virtual' }); });
  if (seg.virtualMeetingTypes.otherSelected && seg.virtualMeetingTypes.otherText.trim()) items.push({ label: seg.virtualMeetingTypes.otherText, timing: seg.virtualMeetingTypes.otherTiming, group: 'Virtual' });

  seg.emailComms.forEach((row) => { if (row.name && row.name.trim()) items.push({ label: row.name, timing: row.timing, group: 'Communications' }); });
  if (seg.accessOptions.videoUpdates.selected) items.push({ label: 'Video-based messages / updates', timing: seg.accessOptions.videoUpdates.timing, group: 'Communications' });

  DELIVERABLE_OPTIONS.forEach((opt) => { const v = seg.deliverables[opt.key]; if (v.selected) items.push({ label: opt.label, timing: v.timing, group: 'Deliverable' }); });
  if (seg.deliverables.otherSelected && seg.deliverables.otherText.trim()) items.push({ label: seg.deliverables.otherText, timing: seg.deliverables.otherTiming, group: 'Deliverable' });

  VALUEADD_OPTIONS.forEach((opt) => { const v = seg.valueAdd[opt.key]; if (v.selected) items.push({ label: opt.label, timing: v.timing, group: 'Value-add' }); });
  if (seg.valueAdd.otherSelected && seg.valueAdd.otherText.trim()) items.push({ label: seg.valueAdd.otherText, timing: seg.valueAdd.otherTiming, group: 'Value-add' });

  return items;
}

/* Splits calendar items into two treatments:
   - "points": one-time-per-year touchpoints (a specific month, a quarter,
     or a periodic cadence like Quarterly/Semi-annual, which repeats as a
     point at each applicable month — e.g. Quarterly Review becomes 4
     points). These plot as dots along a single line.
   - "continuous": truly ongoing things (Monthly, As needed (reactive))
     that don't belong at one point in time — these render as full-width
     bars under the line instead of 12 cluttered dots. */
function buildTimeline(seg) {
  const items = collectCalendarItems(seg);
  const points = [];
  const continuous = [];

  items.forEach((item) => {
    if (item.timing === 'Monthly' || item.timing === 'As needed (reactive)') {
      continuous.push(item);
      return;
    }
    const months = TIMING_TO_MONTHS[item.timing];
    if (!months) return;
    months.forEach((m) => points.push({ ...item, month: m }));
  });

  // Spread same-month points across that month's slot, then alternate
  // above/below the line (staggering stem length every other pair) so
  // nearby points don't collide.
  const byMonth = {};
  points.forEach((p) => { (byMonth[p.month] = byMonth[p.month] || []).push(p); });
  const positioned = [];
  Object.keys(byMonth).map(Number).sort((a, b) => a - b).forEach((m) => {
    const group = byMonth[m];
    const monthStart = ((m - 1) / 12) * 100;
    const monthWidth = 100 / 12;
    group.forEach((item, i) => {
      positioned.push({ ...item, x: monthStart + ((i + 0.5) / group.length) * monthWidth });
    });
  });
  positioned.sort((a, b) => a.x - b.x);
  positioned.forEach((item, i) => {
    item.side = i % 2 === 0 ? 'above' : 'below';
    item.stem = 44 + (Math.floor(i / 2) % 2) * 30;
  });

  return { points: positioned, continuous };
}

function cadenceCaption(timing) {
  if (timing === 'Monthly') return 'ongoing all year';
  if (timing === 'As needed (reactive)') return 'as needed, year-round';
  return '';
}

function SegmentCalendar({ seg, label }) {
  const { points, continuous } = buildTimeline(seg);
  const groupsPresent = [...new Set([...points.map((p) => p.group), ...continuous.map((c) => c.group)])];

  return (
    <div className="print-avoid-break" style={{ marginBottom: 40, border: `1.5px solid ${COLOR.border}`, borderRadius: 16, padding: '26px 24px', background: COLOR.white }}>
      <h3 style={{ fontFamily: FONT_HEAD, fontSize: 20, color: COLOR.oxblood, marginTop: 0, marginBottom: 14 }}>{label} — Annual Service Calendar</h3>

      {groupsPresent.length === 0 ? (
        <div style={{ fontSize: 13, color: '#B3AB9C', marginBottom: 16 }}>No dated meetings, deliverables, or value-adds yet.</div>
      ) : (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: 18 }}>
            {groupsPresent.map((g) => (
              <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B6459', fontWeight: 600 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: GROUP_COLOR[g], display: 'inline-block' }} />
                {g === 'Meeting' ? 'In-person' : g}
              </div>
            ))}
          </div>

          <div style={{ position: 'relative', height: 210, marginBottom: 10 }}>
            <div style={{ position: 'absolute', left: 0, right: 18, top: '50%', height: 2, background: COLOR.tan }} />
            <div style={{ position: 'absolute', right: -2, top: '50%', transform: 'translateY(-50%)', color: COLOR.tan, fontSize: 18, fontWeight: 700 }}>»</div>

            {points.map((item, i) => {
              const color = GROUP_COLOR[item.group];
              const isAbove = item.side === 'above';
              return (
                <div key={i}>
                  <div style={{ position: 'absolute', left: `${item.x}%`, top: '50%', width: 9, height: 9, borderRadius: '50%', background: color, transform: 'translate(-50%, -50%)', zIndex: 2 }} />
                  <div style={{
                    position: 'absolute', left: `${item.x}%`, width: 2, background: COLOR.border, transform: 'translateX(-50%)',
                    top: isAbove ? `calc(50% - ${item.stem}px)` : '50%', height: item.stem,
                  }} />
                  <div style={{
                    position: 'absolute', left: `${item.x}%`, width: 120, transform: isAbove ? 'translate(-50%, -100%)' : 'translateX(-50%)', textAlign: 'center',
                    top: isAbove ? `calc(50% - ${item.stem + 8}px)` : `calc(50% + ${item.stem + 6}px)`,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: COLOR.nearBlack, lineHeight: 1.25 }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: '#8A8172' }}>{MONTHS[item.month - 1]}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {continuous.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {continuous.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, borderRadius: 8, padding: '9px 16px', background: GROUP_COLOR[item.group], color: COLOR.white, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0 }}>{item.group === 'Meeting' ? 'In-person' : item.group}</span>
                  <span style={{ fontSize: 13, opacity: 0.95 }}>{item.label} · {cadenceCaption(item.timing)}</span>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', background: COLOR.tanLight, borderRadius: 10, padding: '16px 18px' }}>
        <SummaryStat label="In-person meeting frequency" value={seg.inPersonFrequency || '—'} />
        <SummaryStat label="Virtual meeting frequency" value={seg.virtualFrequency || '—'} />
      </div>
    </div>
  );
}

function SummaryStat({ label, value }) {
  return (
    <div style={{ minWidth: 160 }}>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 20, color: COLOR.oxblood }}>{value}</div>
      <div style={{ fontSize: 13, color: '#6B6459' }}>{label}</div>
    </div>
  );
}